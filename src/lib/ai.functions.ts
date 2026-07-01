import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getGateway, DEFAULT_MODEL } from "./ai-gateway.server";

const EmailInput = z.object({
  recipient: z.string().min(1),
  recipientType: z.string().min(1),
  tone: z.string().min(1),
  purpose: z.string().min(1),
  context: z.string().optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      system:
        "You are Vulindlela, a South African corporate-communications assistant helping SME founders, contractors, and second/third-language English speakers. Translate the user's rough intent (English, mixed with local phrases or slang) into the requested tone. Tone guide: 'Corporate Pitch' = polished formal English for big retailers / banks / listed companies; 'Client Care' = warm, human, locally relatable for SA customers; 'Debt Collection' = firm, professional, persuasive, references specific amounts and dates without being aggressive; 'Tender / Proposal' = structured, compliant, procurement-friendly. Never patronise the reader. Return ONLY the email: 'Subject:' on line 1, blank line, then body. No commentary.",
      prompt: `Write an email with the following parameters:
Recipient: ${data.recipient} (${data.recipientType})
Tone: ${data.tone}
Purpose: ${data.purpose}
Rough draft / context from the user (may be informal SA English): ${data.context || "none"}`,
    });
    return { text };
  });

const NotesInput = z.object({ notes: z.string().min(10) });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => NotesInput.parse(d))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      system:
        "You are Vulindlela's Imbizo summariser. Input is a transcript of a long WhatsApp voice note, an Imbizo, or a virtual meeting from a South African business context. Output MUST be low-bandwidth friendly (text only, no fluff) in this exact markdown structure and nothing else:\n## TL;DR\n(Exactly 3 short sentences summarising the whole thing.)\n## Action Items\n| Owner | Task | Deadline |\n(one row per action)\n## Decisions & Deadlines\n- Bullet list of hard decisions with dates and any agreed financial figures (in ZAR where mentioned).\n## Outstanding Issues\n- Bullet list of unresolved items.\nKeep it terse. Preserve names, rand amounts, and dates exactly.",
      prompt: data.notes,
    });
    return { text };
  });

const PlanInput = z.object({
  tasks: z.string().min(3),
  horizon: z.enum(["day", "week"]),
  workingHours: z.string().optional().default("8"),
  gridStatus: z.enum(["online", "offline"]).optional().default("online"),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PlanInput.parse(d))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      system:
        "You are Vulindlela's Grid-Aware Planner for South African SMEs and contractors. Tasks may be tagged with resource requirements like [Requires High-Speed Wi-Fi], [Requires Desktop Power], [Can do offline on mobile], [Requires Wi-Fi + Power]. Loadshedding and connectivity drops are the default — plan defensively.\n\nRules:\n- If grid status is OFFLINE: front-load only offline-safe tasks (reading, drafting, phone calls on mobile). Push high-bandwidth / power-dependent tasks to the end and flag them as 'ONCE POWER RETURNS'.\n- If grid status is ONLINE: schedule high-bandwidth / power-dependent work in the earliest stable block. Keep offline-safe filler ready as a fallback.\n- Break large projects into bite-sized blocks to reduce mental load.\n\nOutput clean markdown ONLY, in this order:\n## Grid Status & Strategy (1 line)\n## Prioritized Schedule\n| Time | Task | Resource | Why now |\n## Fallback if grid drops\n- Bullet list of tasks to shift to immediately\n## Deadline alerts\n- Bullet list of anything due within 48h",
      prompt: `Grid status: ${data.gridStatus?.toUpperCase()}.\nPlan horizon: ${data.horizon}.\nAvailable working hours per day: ${data.workingHours}.\nTasks (with resource tags where provided):\n${data.tasks}`,
    });
    return { text };
  });

const ResearchInput = z.object({
  content: z.string().min(20),
  focus: z.string().optional().default(""),
});

export const summarizeResearch = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      system:
        "You are an engineering research assistant. Summarize technical content into clean markdown with: ## TL;DR (3 bullets), ## Key Findings, ## Technical Details, ## Recommendations, ## Open Questions. Translate jargon into plain language while keeping precise numbers/standards.",
      prompt: `${data.focus ? `Focus on: ${data.focus}\n\n` : ""}Content:\n${data.content}`,
    });
    return { text };
  });
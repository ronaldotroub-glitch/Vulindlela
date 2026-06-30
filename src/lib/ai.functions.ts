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
        "You are an expert engineering workplace communications assistant. Write polished, professional emails. Return only the email — start with 'Subject:' on the first line, then a blank line, then the body. No commentary.",
      prompt: `Write an email with the following parameters:
Recipient: ${data.recipient} (${data.recipientType})
Tone: ${data.tone}
Purpose: ${data.purpose}
Additional context: ${data.context || "none"}`,
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
        "You summarize engineering meeting notes. Output clean markdown with these sections only: ## Key Discussion Points, ## Decisions Made, ## Action Items (table: Owner | Task | Deadline), ## Outstanding Issues. Be concise and specific.",
      prompt: data.notes,
    });
    return { text };
  });

const PlanInput = z.object({
  tasks: z.string().min(3),
  horizon: z.enum(["day", "week"]),
  workingHours: z.string().optional().default("8"),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PlanInput.parse(d))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      system:
        "You are an AI task planner for busy engineers. Given a list of tasks (and any deadlines/urgency), produce a prioritized, time-blocked plan in markdown. Include: a one-line summary, a prioritized table (Priority | Task | Est. time | Why), a time-blocked schedule with breaks, and deadline alerts. Be realistic and concise.",
      prompt: `Plan horizon: ${data.horizon}. Available working hours per day: ${data.workingHours}.\nTasks:\n${data.tasks}`,
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
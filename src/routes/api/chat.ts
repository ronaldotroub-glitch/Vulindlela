import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getGateway, DEFAULT_MODEL } from "@/lib/ai-gateway.server";

type Body = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as Body;
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const gateway = getGateway();
        const result = streamText({
          model: gateway(DEFAULT_MODEL),
          system:
            "You are Workly AI, an AI workplace assistant for engineering teams. You help with drafting emails, summarizing meeting notes, planning tasks, and researching technical topics. Be concise, professional, and use markdown formatting. When the user asks for something a dedicated tool handles, you can still answer directly in chat.",
          messages: await convertToModelMessages(messages as UIMessage[]),
        });
        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    // Create a new agent with a system prompt (you can add optional tools, too)
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert code agent in javascript. Help me write a function that codes the following",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(
      ` Code: ${event.data.value}`
    );

    return { output };
  }
);

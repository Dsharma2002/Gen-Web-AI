import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("gen-web-ds-test-2");
      return sandbox.sandboxId;
    });
    // Create a new agent with a system prompt (you can add optional tools, too)
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert code agent in javascript. Help me write a function that codes the following",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(` Code: ${event.data.value}`);

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });

    return { output, sandboxUrl };
  }
);

import { caller } from "@/trpc/server";

const Page = async () => {
  const data = await caller.createAI({ text: "Div" });
  return <div>{JSON.stringify(data)}</div>;
};

export default Page;

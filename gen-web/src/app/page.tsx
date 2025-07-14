import { prisma } from "@/lib/db";
// import { Button } from "@/components/ui/button";

const Page = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
   <div>{JSON.stringify(users, null, 2)}</div>
  );
};

export default Page;

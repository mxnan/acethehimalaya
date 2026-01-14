import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Home Page for showcasing main components",
};
export default function Home() {
  return (
    <div className="my-8 min-h-screen flex items-center justify-center">
      <Button variant={"secondary"}>
        {" "}
        <Link href={"/blogs"}>Blogs</Link>
      </Button>
      <Button variant={"secondary"}>
        {" "}
        <Link href={"/trips"}>Trips</Link>
      </Button>
    </div>
  );
}

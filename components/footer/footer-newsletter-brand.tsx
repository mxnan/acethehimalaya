"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Icons } from "../brand";


export default function FooterNewsletterBrand() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <section className="mb-8 relative w-full flex flex-col max-lg:items-center lg:flex-row gap-8">

      <Card className="min-h-[300px] w-full lg:w-1/3 h-full grow">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-3xl">Subscribe Now !</CardTitle>
          <CardDescription className="font-semibold">
            Get travel tips, exclusive offers, and the latest updates on our adventures.
            We also keep you informed about new blog posts, guides, and special promotions.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <form
            className="mt-2 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!fullName.trim()) {
                toast.warning("Please enter your full name");
                return;
              }
              if (!/\S+@\S+\.\S+/.test(email)) {
                toast.warning("Please enter a valid email");
                return;
              }
              toast.success("Subscribed");
              // TODO: send fullName, email to API
              setFullName("");
              setEmail("");
            }}
          >
            <label htmlFor="full-name" className="sr-only">Full name</label>
            <input
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Manan Negi"
              className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mxnanbuiltthis@gmail.com"
              className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="mt-2">
              <Button type="submit" className="transition-transform hover:scale-[1.03]">Subscribe</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:max-h-[354px] w-full lg:w-2/3 grow overflow-hidden p-2 bg-muted/30  shadow-none">
        <div className="h-full w-full">
          <Icons.navlogo className="w-full h-full" />
        </div>
      </Card>

    </section>
  )
}

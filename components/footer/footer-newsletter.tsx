"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function FooterNewsletter() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <section className="relative h-full w-full flex-1">
      <div className="mx-auto max-w-md ">
        <Card>
          <CardHeader>
            <CardTitle>Subscribe</CardTitle>
            <CardDescription>Get travel tips and exclusive offers</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="mt-2 flex flex-col gap-3"
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
                placeholder="Full name"
                className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <div className="mt-2">
                <Button type="submit" className="w-full transition-transform hover:scale-[1.03]">Subscribe</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

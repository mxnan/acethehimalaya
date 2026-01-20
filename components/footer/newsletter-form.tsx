"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/* -------------------------------------------------------------------------- */
/* Schema                                                                      */
/* -------------------------------------------------------------------------- */

const newsletterSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .max(50, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function NewsletterForm() {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  function onSubmit(data: NewsletterFormValues) {
    toast.success("Subscribed successfully!", {
      description: `${data.email} has been added to our newsletter.`,
    });

    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <FieldGroup className="flex flex-col gap-4">
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newsletter-name">Full name</FieldLabel>
              <Input
                {...field}
                id="newsletter-name"
                placeholder="Manan Negi"
                autoComplete="name"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newsletter-email">Email address</FieldLabel>
              <Input
                {...field}
                id="newsletter-email"
                type="email"
                placeholder="mxnanbuiltthis@gmail.com"
                autoComplete="email"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-4 flex items-center gap-3">
        <Button
          type="submit"
          className="transition-transform hover:scale-[1.03]"
        >
          Subscribe
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => form.reset()}
          aria-label="Reset form"
          className="hover:rotate-[-15deg] transition-transform"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

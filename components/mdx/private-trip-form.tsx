"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Schema                                                                      */
/* -------------------------------------------------------------------------- */

// Update the schema to make all fields required
const privateTripSchema = z.object({
  tripName: z.string().min(1, "Trip name is required"),
  date: z.string().min(1, "Please select a date"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Invalid phone number"),
  travelers: z.string().min(1, "Please select number of travellers"),
  country: z.string().min(1, "Country is required"),
  referral: z.string().min(1, "Please select an option"),
  message: z.string().min(1, "Message is required"),
  agree: z.literal(true, {
    message: "You must accept the terms",
  }),
});
type PrivateTripFormValues = z.infer<typeof privateTripSchema>;

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

type PrivateTripFormProps = {
  tripName?: string;
  lockTripName?: boolean;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function PrivateTripForm({
  tripName,
  lockTripName = true,
  className,
}: PrivateTripFormProps) {
  const form = useForm<PrivateTripFormValues>({
    resolver: zodResolver(privateTripSchema),
    defaultValues: {
      tripName: tripName ?? "",
      date: "",
      fullName: "",
      email: "",
      phone: "",
      travelers: "",
      country: "",
      referral: "",
      message: "",
      agree: true,
    },
  });

  function onSubmit(data: PrivateTripFormValues) {
    toast.success("Private trip request sent", {
      description: "We’ll get back to you shortly.",
    });

    form.reset({
      ...form.getValues(),
      message: "",
      agree: true,
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trip Name (optional, locked) */}
        {tripName && (
          <Field>
            <FieldLabel>Trip Name *</FieldLabel>
            <Input
              value={tripName}
              readOnly={lockTripName}
              className={lockTripName ? "bg-muted cursor-not-allowed" : ""}
            />
          </Field>
        )}
        {/* Date */}
        <Controller
          name="date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Choose your own date *</FieldLabel>
              <Input type="date" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Full Name */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Lead Traveller’s Full Name *</FieldLabel>
              <Input placeholder="Full Name" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email *</FieldLabel>
              <Input type="email" placeholder="Email" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Phone *</FieldLabel>
              <Input placeholder="Phone Number" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Travellers */}
        <Controller
          name="travelers"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>No. of Travellers *</FieldLabel>
              <Input placeholder="e.g. 2" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Country */}
        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Country *</FieldLabel>
              <Input placeholder="Country" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Referral */}
        <Controller
          name="referral"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>How did you find Ace the Himalaya? *</FieldLabel>
              <Input placeholder="Google / Friend / Instagram" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/* Message */}
      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="mt-4" data-invalid={fieldState.invalid}>
            <FieldLabel>Message *</FieldLabel>
            <InputGroupTextarea
              rows={5}
              className="border rounded-lg"
              placeholder="Place your comments here"
              {...field}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Agreement */}
      <Controller
        name="agree"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="mt-4" data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldDescription>
                I agree to Ace the Himalaya Terms and Conditions
              </FieldDescription>
            </div>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Submit */}
      <div className="my-6 flex gap-4">
        <Button type="submit">Send Inquiry</Button>
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

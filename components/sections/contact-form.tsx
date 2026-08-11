"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import type { ContactFormContent } from "@/content/types";

/**
 * The contact form.
 *
 * Client-side because of the submitted state. There is no endpoint behind it
 * yet — `onSubmit` acknowledges locally, exactly as the design prototype does.
 * Wiring it up means replacing the handler with a Server Action and keeping
 * the rest of this component as it stands.
 */
export function ContactForm({ content }: { content: ContactFormContent }) {
  const [sent, setSent] = useState(false);
  const ids = useId();
  const fieldId = (name: string) => `${ids}-${name}`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label={content.name.label} htmlFor={fieldId("name")}>
        <Input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={content.name.placeholder}
        />
      </Field>

      <Field label={content.email.label} htmlFor={fieldId("email")}>
        <Input
          id={fieldId("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={content.email.placeholder}
        />
      </Field>

      <Field label={content.company.label} htmlFor={fieldId("company")}>
        <Input
          id={fieldId("company")}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={content.company.placeholder}
        />
      </Field>

      <Field label={content.subject.label} htmlFor={fieldId("subject")}>
        <Select id={fieldId("subject")} name="subject" defaultValue={content.subject.options[0]}>
          {content.subject.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label={content.message.label}
        htmlFor={fieldId("message")}
        className="col-span-full"
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          placeholder={content.message.placeholder}
        />
      </Field>

      <div className="col-span-full flex flex-wrap items-center gap-[18px]">
        <Button type="submit" variant="primary" className="min-h-[44px]">
          {content.submit}
        </Button>

        <p aria-live="polite" className="m-0 text-[13.5px] font-semibold text-accent-700">
          {sent ? content.success : null}
        </p>
      </div>
    </form>
  );
}

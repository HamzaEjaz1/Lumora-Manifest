"use client";

import { useTranslations } from "next-intl";
import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { zodResolver } from "./zod-resolver";
import { useForm } from "react-hook-form";
import { z } from "zod";

const topics = ["account", "voice", "billing", "other"] as const;

type SupportValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
  company: string;
};

export function SupportForm() {
  const t = useTranslations("support");
  const successRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const schema = z.object({
    name: z.string().trim().min(2, t("errors.name")),
    email: z.string().trim().email(t("errors.email")),
    topic: z.string().min(1, t("errors.topic")),
    message: z.string().trim().min(10, t("errors.message")),
    company: z.string(),
  });

  const form = useForm<SupportValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", topic: "", message: "", company: "" },
  });

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  if (sent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="panel p-8 outline-none"
      >
        <h2 className="text-3xl font-light">{t("successTitle")}</h2>
        <p className="mt-3" style={{ color: "var(--muted)" }}>
          {t("success")}
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-6 h-11 px-5 text-sm"
          onClick={() => {
            setSent(false);
            form.reset();
          }}
        >
          {t("another")}
        </button>
      </div>
    );
  }

  return (
    <form
      className="panel relative space-y-5 p-6 sm:p-8"
      noValidate
      onSubmit={form.handleSubmit((values) => {
        if (values.company) {
          setSent(true);
          return;
        }
        setSent(true);
      })}
    >
      <Field label={t("name")} error={form.formState.errors.name?.message} htmlFor="name">
        <input
          id="name"
          autoComplete="name"
          className={fieldClass}
          aria-invalid={Boolean(form.formState.errors.name)}
          {...form.register("name")}
        />
      </Field>
      <Field label={t("email")} error={form.formState.errors.email?.message} htmlFor="email">
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          aria-invalid={Boolean(form.formState.errors.email)}
          {...form.register("email")}
        />
      </Field>
      <Field label={t("topic")} error={form.formState.errors.topic?.message} htmlFor="topic">
        <select
          id="topic"
          className={fieldClass}
          aria-invalid={Boolean(form.formState.errors.topic)}
          {...form.register("topic")}
        >
          <option value="">{t("topicPlaceholder")}</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {t(`topics.${topic}`)}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t("message")} error={form.formState.errors.message?.message} htmlFor="message">
        <textarea
          id="message"
          rows={5}
          className={`${fieldClass} h-auto py-3`}
          aria-invalid={Boolean(form.formState.errors.message)}
          {...form.register("message")}
        />
      </Field>
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
      </div>
      <button type="submit" className="btn btn-primary">
        {t("submit")}
      </button>
    </form>
  );
}

const fieldClass =
  "h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 text-[var(--text)] outline-none";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  const control = isValidElement<{ "aria-describedby"?: string }>(children)
    ? cloneElement(children, { "aria-describedby": error ? errorId : undefined })
    : children;
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm">
        {label}
      </label>
      {control}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm" style={{ color: "var(--accent-text)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

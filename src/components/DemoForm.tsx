import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const demoSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  designation: z.string().trim().min(1, "Please enter your designation").max(120),
  organisation: z.string().trim().min(1, "Please enter your state or organisation").max(200),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{5,19}$/, "Please enter a valid phone number"),
  message: z.string().trim().max(2000).optional(),
});

type Field = keyof z.infer<typeof demoSchema>;

const FIELDS: { name: Field; label: string; type?: string; autoComplete?: string }[] = [
  { name: "name", label: "Full name", autoComplete: "name" },
  { name: "designation", label: "Designation", autoComplete: "organization-title" },
  { name: "organisation", label: "State / Organisation", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

const inputCls =
  "mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-ink placeholder:text-muted-foreground transition-colors duration-500 focus:border-blue focus:outline-none focus:ring-2 focus:ring-ring/30";

export function DemoForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = demoSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as Field] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("demo_requests").insert({
      ...parsed.data,
      message: parsed.data.message || null,
    });
    setStatus(error ? "error" : "done");
  }

  if (status === "done") {
    return (
      <div className="card-surface flex flex-col items-center p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-success" aria-hidden />
        <h3 className="mt-4 text-2xl font-extrabold text-ink">Thank you — request received</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Our team will reach out within two working days to schedule your SamarthX demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      {FIELDS.map((f) => (
        <div key={f.name} className={f.name === "organisation" ? "sm:col-span-2" : ""}>
          <label htmlFor={f.name} className="text-sm font-semibold text-ink">
            {f.label} <span className="text-destructive">*</span>
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type ?? "text"}
            autoComplete={f.autoComplete}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
            className={inputCls}
          />
          {errors[f.name] && (
            <p id={`${f.name}-err`} className="mt-1 text-sm text-destructive">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Message
        </label>
        <textarea id="message" name="message" rows={4} maxLength={2000} className={inputCls} />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive sm:col-span-2" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-cta w-full px-6 py-3.5 disabled:opacity-70 sm:w-auto">
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Request a Demo
        </button>
      </div>
    </form>
  );
}

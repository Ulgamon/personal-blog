import React, { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";

interface ContactViewProps {
  onCommandOpen?: () => void;
}

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE =
  // good-enough email check for UI validation
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};

  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2)
    errors.name = "Name should be at least 2 characters.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10)
    errors.message = "Message should be at least 10 characters.";

  return errors;
}

export function ContactView({ onCommandOpen }: ContactViewProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const errors = useMemo(() => validate(formData), [formData]);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name as keyof FormData]: true }));
  };

  const markAllTouched = () => {
    setTouched({ name: true, email: true, message: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    markAllTouched();

    const currentErrors = validate(formData);
    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Use formsubmit.co via POST
      const action = "https://formsubmit.co/ilicjustin@gmail.com"; // <-- CHANGE ME
      const body = new FormData(e.currentTarget);

      const res = await fetch(action, {
        method: "POST",
        body,
        headers: {
          Accept: "application/json", // makes formsubmit return JSON
        },
      });

      if (!res.ok) {
        // Try to parse formsubmit error, but keep it user-friendly
        let msg =
          "Something went wrong while sending your message. Please try again.";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setSubmitSuccess("Thanks! Your message has been sent ✅");
      setFormData({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (key: keyof FormData) =>
    touched[key] ? errors[key] : undefined;

  const inputBase =
    "w-full px-4 py-3 md:py-4 bg-[--color-bg-secondary] border rounded-[var(--radius-md)] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary] focus:border-transparent transition-all duration-200";

  const errorText = "mt-2 text-sm text-red-500";
  const helperText = "mt-2 text-sm text-[--color-text-tertiary]";

  return (
    <div className="min-h-screen">
      <SiteHeader onCommandOpen={onCommandOpen} />

      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-12 md:mb-16">
          <h1 className="mb-6 leading-[1.15]">Contact</h1>
          <p
            className="text-lg md:text-xl text-[--color-text-secondary] max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            I'd love to hear from you. Whether you have a question or just want
            to say hello, feel free to reach out.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20">
          <section>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8"
              method="POST"
              action="https://formsubmit.co/ilicjustin@gmail.com" // kept for semantics
            >
              {/* formsubmit options */}
              <input
                type="hidden"
                name="_subject"
                value="New message from your site"
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              {/* If you want a redirect (we're handling success ourselves, so optional) */}
              {/* <input type="hidden" name="_next" value="https://yoursite.com/thanks" /> */}

              {/* Global status */}
              {(submitError || submitSuccess) && (
                <div
                  className={[
                    "rounded-[var(--radius-md)] border px-4 py-3 text-sm",
                    submitError
                      ? "border-red-500/30 bg-red-500/10 text-red-200"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
                  ].join(" ")}
                  role="status"
                  aria-live="polite"
                >
                  {submitError ?? submitSuccess}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[--color-text-secondary] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(fieldError("name"))}
                  aria-describedby={
                    fieldError("name") ? "name-error" : "name-help"
                  }
                  className={[
                    inputBase,
                    fieldError("name")
                      ? "border-red-500/60 focus:ring-red-500"
                      : "border-[--color-border-subtle]",
                  ].join(" ")}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
                {fieldError("name") ? (
                  <p id="name-error" className={errorText}>
                    {fieldError("name")}
                  </p>
                ) : (
                  <p id="name-help" className={helperText}>
                    Enter the name you’d like me to respond to.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[--color-text-secondary] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(fieldError("email"))}
                  aria-describedby={
                    fieldError("email") ? "email-error" : "email-help"
                  }
                  className={[
                    inputBase,
                    fieldError("email")
                      ? "border-red-500/60 focus:ring-red-500"
                      : "border-[--color-border-subtle]",
                  ].join(" ")}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {fieldError("email") ? (
                  <p id="email-error" className={errorText}>
                    {fieldError("email")}
                  </p>
                ) : (
                  <p id="email-help" className={helperText}>
                    I’ll only use this to reply.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[--color-text-secondary] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={6}
                  aria-invalid={Boolean(fieldError("message"))}
                  aria-describedby={
                    fieldError("message") ? "message-error" : "message-help"
                  }
                  className={[
                    inputBase,
                    "resize-y",
                    fieldError("message")
                      ? "border-red-500/60 focus:ring-red-500"
                      : "border-[--color-border-subtle]",
                  ].join(" ")}
                  placeholder="Your message..."
                  disabled={isSubmitting}
                />
                {fieldError("message") ? (
                  <p id="message-error" className={errorText}>
                    {fieldError("message")}
                  </p>
                ) : (
                  <p id="message-help" className={helperText}>
                    Include any details that help me respond.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full md:w-auto bg-[--color-accent-primary] text-white hover:bg-[--color-accent-hover] px-8 py-6 text-base rounded-[var(--radius-md)] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                        aria-hidden="true"
                      />
                      Sending…
                    </span>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </div>
            </form>
          </section>

          <aside className="lg:min-w-[280px] space-y-10 md:space-y-12">
            <div>
              <h2 className="text-sm font-semibold mb-4 text-[--color-text-tertiary] uppercase tracking-wide">
                Email
              </h2>
              <a
                href="mailto:ilicjustin@gmail.com"
                className="text-base md:text-lg text-[--color-text-primary] hover:text-[--color-accent-primary] transition-colors duration-200 break-all"
              >
                ilicjustin@gmail.com
              </a>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-4 text-[--color-text-tertiary] uppercase tracking-wide">
                Links
              </h2>
              <div className="space-y-3">
                <div>
                  <a
                    href="https://github.com/Ulgamon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-[--color-text-secondary] hover:text-[--color-accent-primary] transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/justin-ilic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-[--color-text-secondary] hover:text-[--color-accent-primary] transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-4 text-[--color-text-tertiary] uppercase tracking-wide">
                Location
              </h2>
              <p className="text-base text-[--color-text-secondary]">
                Vršac, Serbia
              </p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

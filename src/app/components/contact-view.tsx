import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";

interface ContactViewProps {
  onCommandOpen?: () => void;
}

export function ContactView({ onCommandOpen }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <SiteHeader onCommandOpen={onCommandOpen} />

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20">
          {/* Left Column - Contact Form */}
          <section>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
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
                  required
                  className="w-full px-4 py-3 md:py-4 bg-[--color-bg-secondary] border border-[--color-border-subtle] rounded-[--radius-md] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary] focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                />
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
                  required
                  className="w-full px-4 py-3 md:py-4 bg-[--color-bg-secondary] border border-[--color-border-subtle] rounded-[--radius-md] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary] focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                />
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
                  required
                  rows={6}
                  className="w-full px-4 py-3 md:py-4 bg-[--color-bg-secondary] border border-[--color-border-subtle] rounded-[--radius-md] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary] focus:border-transparent transition-all duration-200 resize-y"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto bg-[--color-accent-primary] text-white hover:bg-[--color-accent-hover] px-8 py-6 text-base rounded-[--radius-md] transition-colors duration-200"
              >
                Send message
              </Button>
            </form>
          </section>

          {/* Right Column - Contact Details */}
          <aside className="lg:min-w-[280px] space-y-10 md:space-y-12">
            {/* Email */}
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

            {/* Links */}
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

            {/* Location */}
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

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

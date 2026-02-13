import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";

interface ResumeViewProps {
  onCommandOpen?: () => void;
}

export function ResumeView({ onCommandOpen }: ResumeViewProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <SiteHeader onCommandOpen={onCommandOpen} />

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <header className="mb-20">
            <h1 className="mb-8 leading-[1.15]">Justin Ilić</h1>
            <p
              className="text-lg text-[--color-text-secondary] mb-2"
              style={{ lineHeight: "1.8" }}
            >
              Security-focused developer with a strong foundation in modern web
              development and computer science fundamentals.
            </p>
            <p
              className="text-base text-[--color-text-tertiary]"
              style={{ lineHeight: "1.8" }}
            >
              Serbia · ilicjustin@gmail.com
            </p>
          </header>

          {/* Summary */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-8 text-[--color-text-primary]">
              Summary
            </h2>
            <p
              className="text-[--color-text-secondary] mb-6"
              style={{ lineHeight: "2" }}
            >
              I build and maintain web applications with a focus on security,
              reliability, and clean implementation. My interests span
              application security, frontend and backend development, and DevOps
              fundamentals, with an emphasis on understanding how systems work
              end-to-end.
            </p>
            <p
              className="text-[--color-text-secondary]"
              style={{ lineHeight: "2" }}
            >
              Through formal coursework, certifications, and freelance work,
              I've developed a solid grounding in computer science, web
              technologies, and secure development practices. I'm particularly
              interested in defensive security, real-time systems, and building
              maintainable software with clear architecture.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-10 text-[--color-text-primary]">
              Experience
            </h2>

            <div className="space-y-12">
              <article>
                <div className="mb-5">
                  <h3 className="text-xl font-semibold mb-1.5">
                    Freelance Web Developer
                  </h3>
                  <p className="text-[--color-text-secondary] mb-1">
                    Self-Employed
                  </p>
                  <p className="text-sm text-[--color-text-tertiary]">
                    2022 – Present
                  </p>
                </div>
                <div
                  className="text-[--color-text-secondary] space-y-4"
                  style={{ lineHeight: "2" }}
                >
                  <p>
                    Designed and developed responsive websites for individual
                    clients and small projects, focusing on clean structure,
                    accessibility, and performance.
                  </p>
                  <p>
                    Built frontend interfaces using modern HTML, CSS,
                    JavaScript, and React, applying component-based architecture
                    and responsive design principles.
                  </p>
                  <p>
                    Collaborated directly with clients to define requirements,
                    implement features, and deliver functional, maintainable
                    solutions.
                  </p>
                  <p>
                    Maintained and iterated on existing projects, improving
                    usability, fixing bugs, and applying best practices for
                    frontend security and code organization.
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* Education */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-10 text-[--color-text-primary]">
              Education & Certifications
            </h2>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  SignalR Mastery: Become a Pro in Real-Time Web Development
                </h3>
                <p className="text-[--color-text-secondary] mb-1">Udemy</p>
                <p className="text-sm text-[--color-text-tertiary]">
                  September 2025
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Focused on building real-time web applications using ASP.NET
                Core SignalR, including WebSockets, event-driven communication,
                scalable messaging patterns, and secure real-time data exchange.
              </p>
            </article>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  CS50's Introduction to Databases with SQL
                </h3>
                <p className="text-[--color-text-secondary] mb-1">
                  Harvard University
                </p>
                <p className="text-sm text-[--color-text-tertiary]">
                  April 2024
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Covered relational database design, SQL querying, normalization,
                indexing, transactions, and query optimization, with an emphasis
                on data integrity and SQL injection prevention.
              </p>
            </article>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  Front End Development Libraries (v8)
                </h3>
                <p className="text-[--color-text-secondary] mb-1">
                  freeCodeCamp.org
                </p>
                <p className="text-sm text-[--color-text-tertiary]">
                  March 2024
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Focused on building single-page applications using React, modern
                JavaScript, hooks, state management, client-side routing, and
                reusable component-based architectures.
              </p>
            </article>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  CS50x: Introduction to Computer Science
                </h3>
                <p className="text-[--color-text-secondary] mb-1">
                  Harvard University
                </p>
                <p className="text-sm text-[--color-text-tertiary]">
                  December 2023
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Covered core computer science concepts including algorithms,
                data structures, memory management in C, Python programming,
                SQL, and secure coding fundamentals.
              </p>
            </article>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  Legacy Responsive Web Design (v8)
                </h3>
                <p className="text-[--color-text-secondary] mb-1">
                  freeCodeCamp.org
                </p>
                <p className="text-sm text-[--color-text-tertiary]">
                  November 2023
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Focused on building accessible, responsive layouts using
                semantic HTML, modern CSS, Flexbox, Grid, media queries, and
                mobile-first design principles.
              </p>
            </article>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  Legacy JavaScript Algorithms and Data Structures (v7)
                </h3>
                <p className="text-[--color-text-secondary] mb-1">
                  freeCodeCamp.org
                </p>
                <p className="text-sm text-[--color-text-tertiary]">
                  February 2023
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Covered JavaScript fundamentals, algorithms, data structures,
                recursion, functional programming patterns, and time and space
                complexity analysis.
              </p>
            </article>
            <article className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">
                  Computer Science (Coursework)
                </h3>
                <p className="text-[--color-text-secondary] mb-1">
                  University of Novi Sad · Faculty of Technical Sciences
                </p>
                <p className="text-sm text-[--color-text-tertiary]">
                  2020 – 2022
                </p>
              </div>
              <p
                className="text-[--color-text-secondary]"
                style={{ lineHeight: "2" }}
              >
                Completed foundational coursework in computer science, including
                programming fundamentals, data structures, algorithms, and
                systems concepts. Focused on building a strong theoretical base
                alongside practical problem-solving skills.
              </p>
            </article>
          </section>

          {/* Skills */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-10 text-[--color-text-primary]">
              Skills
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">
                  Development
                </h3>
                <p
                  className="text-[--color-text-secondary]"
                  style={{ lineHeight: "2" }}
                >
                  HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS,
                  ASP.NET Core, REST APIs, WebSockets, SignalR, Client-Side
                  Routing, Responsive Design
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">
                  Computer Science
                </h3>
                <p
                  className="text-[--color-text-secondary]"
                  style={{ lineHeight: "2" }}
                >
                  Algorithms, Data Structures, Time & Space Complexity,
                  Recursion, Problem Solving, Database Design, SQL
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">
                  Security
                </h3>
                <p
                  className="text-[--color-text-secondary]"
                  style={{ lineHeight: "2" }}
                >
                  Secure Coding Practices, Input Validation, SQL Injection
                  Prevention, Authentication & Authorization Concepts, Real-Time
                  Application Security
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">
                  Tools
                </h3>
                <p
                  className="text-[--color-text-secondary]"
                  style={{ lineHeight: "2" }}
                >
                  Git, npm, Browser DevTools, Figma (for collaboration), Command
                  Line Tools
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">
                  Development
                </h3>
                <p
                  className="text-[--color-text-secondary]"
                  style={{ lineHeight: "2" }}
                >
                  HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Git,
                  responsive design, web performance, REST APIs, component
                  architecture
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

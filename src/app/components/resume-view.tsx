import { Button } from '@/app/components/ui/button';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';

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
            <p className="text-lg text-[--color-text-secondary] mb-2" style={{ lineHeight: '1.8' }}>
              Designer and developer focused on creating thoughtful digital experiences.
            </p>
            <p className="text-base text-[--color-text-tertiary]" style={{ lineHeight: '1.8' }}>
              San Francisco, CA · justin.ilic@example.com
            </p>
          </header>

          {/* Summary */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-8 text-[--color-text-primary]">Summary</h2>
            <p className="text-[--color-text-secondary] mb-6" style={{ lineHeight: '2' }}>
              I design and build user interfaces with a focus on accessibility, performance, and visual clarity. 
              My work bridges the gap between design and development, allowing me to create cohesive experiences 
              from concept to implementation.
            </p>
            <p className="text-[--color-text-secondary]" style={{ lineHeight: '2' }}>
              With over six years of experience, I've contributed to design systems serving hundreds of thousands 
              of users, led product design initiatives, and mentored designers and developers in creating better 
              digital products.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-10 text-[--color-text-primary]">Experience</h2>
            
            <div className="space-y-12">
              <article>
                <div className="mb-5">
                  <h3 className="text-xl font-semibold mb-1.5">Senior Product Designer</h3>
                  <p className="text-[--color-text-secondary] mb-1">Acme Design Studio</p>
                  <p className="text-sm text-[--color-text-tertiary]">2023 – Present</p>
                </div>
                <div className="text-[--color-text-secondary] space-y-4" style={{ lineHeight: '2' }}>
                  <p>
                    Led the design and development of a comprehensive design system for a platform serving over 500,000 users. 
                    The system improved visual consistency across 40+ product features and reduced design-to-development time by 40%.
                  </p>
                  <p>
                    Collaborated with cross-functional engineering teams to implement accessible components that meet WCAG 2.1 AA 
                    standards. Created detailed documentation and guidelines to ensure proper implementation.
                  </p>
                  <p>
                    Mentored three junior designers through weekly design critiques and one-on-one sessions, helping them develop 
                    their skills in user research, interaction design, and visual design.
                  </p>
                </div>
              </article>

              <article>
                <div className="mb-5">
                  <h3 className="text-xl font-semibold mb-1.5">Product Designer</h3>
                  <p className="text-[--color-text-secondary] mb-1">TechFlow Inc.</p>
                  <p className="text-sm text-[--color-text-tertiary]">2021 – 2023</p>
                </div>
                <div className="text-[--color-text-secondary] space-y-4" style={{ lineHeight: '2' }}>
                  <p>
                    Designed and shipped core features for a B2B SaaS platform, resulting in a 35% increase in user engagement 
                    and a 28% reduction in support tickets through improved UX.
                  </p>
                  <p>
                    Conducted extensive user research including interviews, surveys, and usability testing with over 100 participants. 
                    Translated findings into actionable design decisions that directly informed product roadmap priorities.
                  </p>
                  <p>
                    Partnered with product managers and engineers to define feature requirements, create technical specifications, 
                    and ensure smooth handoff from design to development.
                  </p>
                </div>
              </article>

              <article>
                <div className="mb-5">
                  <h3 className="text-xl font-semibold mb-1.5">UX Designer</h3>
                  <p className="text-[--color-text-secondary] mb-1">StartupLabs</p>
                  <p className="text-sm text-[--color-text-tertiary]">2019 – 2021</p>
                </div>
                <div className="text-[--color-text-secondary] space-y-4" style={{ lineHeight: '2' }}>
                  <p>
                    Created wireframes, interactive prototypes, and high-fidelity mockups for mobile and web applications 
                    in a fast-paced startup environment. Iterated quickly based on user feedback and business requirements.
                  </p>
                  <p>
                    Worked closely with the engineering team to ensure design implementation matched specifications and 
                    maintained design quality throughout the development process.
                  </p>
                  <p>
                    Established foundational design processes and documentation practices for a growing startup team, 
                    including component libraries, design reviews, and quality assurance workflows.
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* Education */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-10 text-[--color-text-primary]">Education</h2>
            
            <article>
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-1.5">Bachelor of Science in Computer Science</h3>
                <p className="text-[--color-text-secondary] mb-1">University of Technology</p>
                <p className="text-sm text-[--color-text-tertiary]">2015 – 2019</p>
              </div>
              <p className="text-[--color-text-secondary]" style={{ lineHeight: '2' }}>
                Focused on human-computer interaction and user experience design. Completed coursework in interaction design, 
                cognitive psychology, data structures, algorithms, and web technologies. Senior capstone project involved 
                designing and building an accessible web application for university students.
              </p>
            </article>
          </section>

          {/* Skills */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-10 text-[--color-text-primary]">Skills</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">Design</h3>
                <p className="text-[--color-text-secondary]" style={{ lineHeight: '2' }}>
                  User interface design, user experience design, interaction design, design systems, prototyping, 
                  user research, usability testing, wireframing, accessibility (WCAG), typography, information architecture
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">Tools</h3>
                <p className="text-[--color-text-secondary]" style={{ lineHeight: '2' }}>
                  Figma, Sketch, Adobe Creative Suite, Notion, Miro, UserTesting, Optimal Workshop
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[--color-text-primary]">Development</h3>
                <p className="text-[--color-text-secondary]" style={{ lineHeight: '2' }}>
                  HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Git, responsive design, web performance, 
                  REST APIs, component architecture
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
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { Link } from "react-router";

interface CertificationsViewProps {
  onCommandOpen?: () => void;
}

export function CertificationsView({ onCommandOpen }: CertificationsViewProps) {
  const certifications = [
    {
      name: "SignalR Mastery: Become a Pro in Real-Time Web Development",
      issuer: "Udemy",
      date: "September 2025",
      credentialId: "UC-fb964aa9-b7ad-4b63-ab66-a2bceefe2cd6",
      skills: [
        "ASP.NET Core SignalR",
        "Real-Time Communication",
        "WebSockets",
        "Event-Driven Architecture",
        "Scalable Messaging",
        "Secure Real-Time Applications",
      ],
      link: "https://www.udemy.com/certificate/UC-fb964aa9-b7ad-4b63-ab66-a2bceefe2cd6/",
    },
    {
      name: "CS50’s Introduction to Databases with SQL",
      issuer: "Harvard University",
      date: "April 2024",
      credentialId: "eda33862-03ec-4d52-bdde-9a4686ba9fe1",
      skills: [
        "Relational Databases",
        "SQL",
        "Data Modeling",
        "Normalization",
        "Indexing",
        "Query Optimization",
        "Transactions",
        "SQL Injection Prevention",
      ],
      link: "https://certificates.cs50.io/eda33862-03ec-4d52-bdde-9a4686ba9fe1.pdf?size=letter",
    },
    {
      name: "Front End Development Libraries V8",
      issuer: "freeCodeCamp.org",
      date: "March 2024",
      credentialId: "ulgamon/front-end-development-libraries",
      skills: [
        "React",
        "JavaScript (ES6+)",
        "Component-Based Architecture",
        "Hooks",
        "State Management",
        "Client-Side Routing",
        "Responsive UI Development",
      ],
      link: "https://www.freecodecamp.org/certification/ulgamon/front-end-development-libraries",
    },
    {
      name: "CS50’s Introduction to Databases with SQL",
      issuer: "Harvard University",
      date: "December 2023",
      credentialId: "b5ca7ada-0fd7-4fce-9b65-47af82a48413",
      skills: [
        "Algorithms",
        "Data Structures",
        "C Programming",
        "Memory Management",
        "Python",
        "SQL",
        "Web Development",
        "Secure Coding Fundamentals",
      ],
      link: "https://certificates.cs50.io/b5ca7ada-0fd7-4fce-9b65-47af82a48413.pdf?size=letter",
    },
    {
      name: "Legacy Responsive Web Design V8",
      issuer: "freeCodeCamp.org",
      date: "November 2023",
      credentialId: "ulgamon/responsive-web-design",
      skills: [
        "Responsive Web Design",
        "HTML5",
        "CSS3",
        "Flexbox",
        "CSS Grid",
        "Media Queries",
        "Accessibility",
        "Mobile-First Layouts",
      ],
      link: "https://www.freecodecamp.org/certification/ulgamon/responsive-web-design",
    },
    {
      name: "Legacy JavaScript Algorithms and Data Structures V7",
      issuer: "freeCodeCamp.org",
      date: "February 2023",
      credentialId: "ulgamon/javascript-algorithms-and-data-structures",
      skills: [
        "JavaScript (ES6)",
        "Algorithms",
        "Data Structures",
        "Recursion",
        "Functional Programming",
        "Big O Complexity",
        "Problem Solving",
      ],
      link: "https://www.freecodecamp.org/certification/ulgamon/javascript-algorithms-and-data-structures",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <SiteHeader onCommandOpen={onCommandOpen} />

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <header className="mb-16">
            <h1 className="mb-6 leading-[1.15]">Certifications</h1>
            <p
              className="text-xl text-[--color-text-secondary]"
              style={{ lineHeight: "1.8" }}
            >
              Professional certifications and coursework demonstrating a strong
              foundation in computer science, web development, and application
              security.
            </p>
          </header>

          <Separator className="bg-[--color-border-subtle] mb-16" />

          {/* Certifications List */}
          <div className="space-y-10">
            {certifications.map((cert, index) => (
              <article
                key={index}
                className="border border-[--color-border-subtle] rounded-[--radius-lg] p-6 md:p-8 bg-[--color-bg-secondary] hover:shadow-[--shadow-md] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-5 gap-3">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2 leading-tight">
                      {cert.name}
                    </h2>
                    <p className="text-[--color-text-secondary] mb-3">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-sm text-[--color-text-tertiary] md:text-right">
                    {cert.date}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[--color-text-tertiary] mb-1">
                    Credential ID
                  </p>
                  <p className="text-sm font-mono text-[--color-text-secondary]">
                    {cert.credentialId}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[--color-text-tertiary] mb-3">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="rounded-full"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    className="text-[--color-accent-primary] hover:text-[--color-accent-hover] p-0 h-auto font-medium transition-colors duration-200 group"
                  >
                    View credential
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Button>
                </a>
              </article>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 border-t border-[--color-border-subtle] pt-16">
            <div className="bg-[--color-bg-secondary] border border-[--color-border-subtle] rounded-[--radius-lg] p-8 md:p-10">
              <h2 className="text-2xl font-semibold mb-4">
                Continuous Learning
              </h2>
              <p className="text-[--color-text-secondary] leading-relaxed mb-6">
                Beyond formal certifications, I’m committed to staying current
                with industry practices and emerging technologies. I regularly
                study new tools and frameworks, follow security research, and
                contribute to open-source projects.
              </p>
              <p className="text-[--color-text-secondary] leading-relaxed">
                I am currently pursuing the Google Cybersecurity Professional
                Certificate and Security Analyst Level 1 (SAL1) to deepen my
                understanding of security operations, threat analysis, and
                defensive security practices.
              </p>
            </div>
          </div>

          {/* CTA */}
          <section className="text-center py-16 mt-12">
            <p className="text-lg text-[--color-text-secondary] mb-8">
              Want to learn more about my work?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resume">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-base rounded-[--radius-md] border-[--color-border-default] hover:bg-[--color-bg-tertiary] transition-colors duration-200"
                >
                  View resume
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  className="px-8 py-6 text-base rounded-[--radius-md] transition-colors duration-200"
                >
                  Get in touch
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { Link } from 'react-router';

interface CertificationsViewProps {
  onCommandOpen?: () => void;
}

export function CertificationsView({ onCommandOpen }: CertificationsViewProps) {
  const certifications = [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: 'January 2025',
      credentialId: 'AWS-SA-2025-12345',
      skills: ['Cloud Architecture', 'AWS Services', 'System Design']
    },
    {
      name: 'Professional Scrum Master I (PSM I)',
      issuer: 'Scrum.org',
      date: 'September 2024',
      credentialId: 'PSM-2024-67890',
      skills: ['Agile', 'Scrum', 'Team Leadership']
    },
    {
      name: 'Google UX Design Certificate',
      issuer: 'Google',
      date: 'June 2023',
      credentialId: 'GUX-2023-54321',
      skills: ['UX Research', 'Prototyping', 'User Testing']
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: 'March 2023',
      credentialId: 'META-REACT-2023-98765',
      skills: ['React', 'JavaScript', 'Component Design']
    }
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
            <p className="text-xl text-[--color-text-secondary]" style={{ lineHeight: '1.8' }}>
              Professional certifications and credentials demonstrating expertise across design, development, and cloud technologies.
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
                    <p className="text-[--color-text-secondary] mb-3">{cert.issuer}</p>
                  </div>
                  <div className="text-sm text-[--color-text-tertiary] md:text-right">
                    {cert.date}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[--color-text-tertiary] mb-1">Credential ID</p>
                  <p className="text-sm font-mono text-[--color-text-secondary]">{cert.credentialId}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[--color-text-tertiary] mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="rounded-full">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="text-[--color-accent-primary] hover:text-[--color-accent-hover] p-0 h-auto font-medium transition-colors duration-200 group"
                >
                  View credential
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Button>
              </article>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 border-t border-[--color-border-subtle] pt-16">
            <div className="bg-[--color-bg-secondary] border border-[--color-border-subtle] rounded-[--radius-lg] p-8 md:p-10">
              <h2 className="text-2xl font-semibold mb-4">Continuous Learning</h2>
              <p className="text-[--color-text-secondary] leading-relaxed mb-6">
                Beyond formal certifications, I'm committed to staying current with industry trends and best practices. I regularly participate in workshops, attend conferences, and contribute to open-source projects.
              </p>
              <p className="text-[--color-text-secondary] leading-relaxed">
                Currently pursuing advanced certifications in cloud architecture and accessibility standards.
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
                  className="bg-[--color-accent-primary] text-white hover:bg-[--color-accent-hover] px-8 py-6 text-base rounded-[--radius-md] transition-colors duration-200"
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
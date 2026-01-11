import { Link } from 'react-router-dom';

interface CTASectionProps {
  headline?: string;
  subhead?: string;
  primaryLink?: { href: string; label: string };
  secondaryLink?: { href: string; label: string };
}

export default function CTASection({
  headline = "Ready to begin?",
  subhead = "Whether you're building a career or building a program, we're ready to deliver results.",
  primaryLink = { href: "/jobseekers", label: "Find Work" },
  secondaryLink = { href: "/partners", label: "Partner With Us" }
}: CTASectionProps) {
  return (
    <section className="cta-section py-32 relative text-center text-white bg-black" id="contact">
      <div className="container max-w-container mx-auto px-8">
        <h2 className="font-display text-display-lg font-normal leading-tight tracking-tight mb-6">{headline}</h2>
        <p className="text-xl mb-12 max-w-[700px] mx-auto text-white/70">
          {subhead}
        </p>
        <div className="hero-ctas flex gap-5 justify-center">
          <Link to={primaryLink.href} className="btn-primary"><span>{primaryLink.label}</span></Link>
          <Link to={secondaryLink.href} className="btn-secondary"><span>{secondaryLink.label}</span></Link>
        </div>
      </div>
    </section>
  );
}

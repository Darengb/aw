interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-quote">"</div>
      <blockquote>
        <p>{quote}</p>
        <footer>
          <cite>{author}</cite>
          <span className="testimonial-role">{role}</span>
        </footer>
      </blockquote>
    </article>
  );
}

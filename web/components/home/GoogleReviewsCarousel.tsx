import GoogleReviewCard from './GoogleReviewCard';

interface GoogleReview {
  quote: React.ReactNode;
  author: string;
}

interface GoogleReviewsCarouselProps {
  reviews: GoogleReview[];
  className?: string;
}

export default function GoogleReviewsCarousel({ reviews, className = '' }: GoogleReviewsCarouselProps) {
  return (
    <div className="md:container md:max-w-container mx-auto md:px-8">
      <div className={`testimonials-grid flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide ${className}`}>
        {reviews.map((review, index) => (
          <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
        ))}
      </div>
    </div>
  );
}

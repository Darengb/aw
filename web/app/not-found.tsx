import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">404</div>
        <h1 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Page not found</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2 bg-aw-red text-white px-8 py-4 rounded font-semibold hover:bg-aw-red-dark transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

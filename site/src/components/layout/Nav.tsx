import { Link } from 'react-router-dom';
import { useNavScrollState } from '../../hooks/useNavScrollState';

export default function Nav() {
  const scrollState = useNavScrollState();

  const navClasses = `navigation fixed top-0 left-0 right-0 bg-transparent z-[1000] transition-all duration-300 ${
    scrollState === 'in-hero' ? 'scrolled' : ''
  } ${scrollState === 'below-hero' ? 'below-hero' : ''}`;

  return (
    <nav className={navClasses}>
      <div className="max-w-container mx-auto py-5 px-8 flex justify-between items-center">
        <Link to="/" className="nav-logo flex items-center gap-3 font-crimson text-2xl font-semibold tracking-tight text-white no-underline transition-opacity duration-200 hover:opacity-70">
          <img src="/images/aw-logo-simple.png" alt="AW" className="h-10 w-auto block" />
          <span>AMERICA WORKS</span>
        </Link>

        <div className="nav-links hidden md:flex items-center gap-12">
          <Link to="/jobseekers" className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white">Jobseekers</Link>
          <Link to="/employers" className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white">Employers</Link>
          <Link to="/partners" className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white">Partners</Link>
          <Link to="/news" className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white">News</Link>
          <Link to="/events" className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white">Events</Link>
          <Link to="/about" className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white">About</Link>
          <a href="#contact" className="nav-cta px-7 py-3 bg-aw-blue text-white font-semibold rounded-md shadow-[0_2px_10px_rgba(50,59,151,0.2)] transition-all duration-300 hover:bg-aw-blue-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(50,59,151,0.3)]">Contact</a>
        </div>
      </div>
    </nav>
  );
}

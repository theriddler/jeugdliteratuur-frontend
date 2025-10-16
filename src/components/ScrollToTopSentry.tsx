import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTopSentry = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to the top of the window
    window.scrollTo(0, 0);
  }, [ pathname ]); // Rerun the effect whenever the pathname changes (i.e., on navigation)

  // This component doesn't render anything visually
  return null;
};

export default ScrollToTopSentry;
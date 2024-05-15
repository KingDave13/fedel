import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
    className={`bg-blue-500 text-white py-2 px-4 fixed bottom-5 
    right-5 rounded-lg transition-opacity duration-300 
    ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    onClick={scrollToTop}
    >
      Scroll to Top
    </button>
  );
};

export default ScrollToTopButton;
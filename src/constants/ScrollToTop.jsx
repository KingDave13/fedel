import { useState, useEffect } from 'react';
import { IoArrowUp } from "react-icons/io5";

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
    <div className={`bg-main md:p-3.5 ss:p-3.5 p-3 fixed md:bottom-5 z-20
    ss:bottom-4 bottom-4 md:right-5 ss:right-4 right-4 rounded-full 
    transition-opacity duration-400 cursor-pointer grow2
    ${isVisible ? 'opacity-90' : 'opacity-0 pointer-events-none'}`}
    onClick={scrollToTop}
    >
        <IoArrowUp className='text-white md:text-[25px] ss:text-[25px]
        text-[20px]'/>
    </div>
  );
};

export default ScrollToTopButton;
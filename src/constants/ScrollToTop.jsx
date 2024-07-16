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
    <div className={`bg-main py-3 px-3 fixed md:bottom-10 z-20
    ss:bottom-8 bottom-6 md:right-10 ss:right-8 right-6 rounded-full 
    transition-opacity duration-400 cursor-pointer grow2
    ${isVisible ? 'opacity-90' : 'opacity-0 pointer-events-none'}`}
    onClick={scrollToTop}
    >
        <IoArrowUp className='text-white md:text-[22px] ss:text-[20px]
        text-[16px]'/>
    </div>
  );
};

export default ScrollToTopButton;
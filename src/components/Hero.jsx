import { useState, useEffect } from 'react';
import { heroImages, heroImagesMobile } from '../assets';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { IoSearchOutline } from "react-icons/io5";
import { SectionWrapper2 } from '../hoc';
import { TargetedSearch } from '../features';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1060);
  const [heroHeight, setHeroHeight] = useState('80vh');
  const [loaded, setLoaded] = useState(false);

  const images = isMobile ? heroImagesMobile : heroImages;

  useEffect(() => {
    const preloadImages = (srcArray) => {
      const promises = srcArray.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(promises)
        .then(() => setLoaded(true))
        .catch(() => console.error("Failed to preload images"));
    };

    preloadImages(images);
  }, [images]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1060);
      const viewportHeight = window.innerHeight;
      if (viewportHeight >= 700 && viewportHeight <= 850) {
        setHeroHeight('100vh');
      } else {
        setHeroHeight(isMobile ? '65vh' : '80vh');
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <section className='relative w-full md:min-h-[700px] ss:min-h-[800px] 
    items-center flex md:mb-0 ss:mb-52 mb-36'>
        <div className={`relative items-center w-full max-w-[86rem] p-6
        md:mt-28 ss:mt-20 mt-16 md:rounded-[30px] flex md:p-12 ss:p-10 
        ${loaded ? 'opacity-100' : 'opacity-0 transition-opacity duration-500'}`}
            style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
                objectFit: 'cover',
                backgroundPosition: isMobile ? 'bottom' : 'center',
                height: heroHeight,
                transition: 'background-image 1s ease-in-out',
            }}
        >
            <div className='relative md:items-center ss:items-center 
            justify-between w-full flex md:flex-row flex-col md:gap-44 
            ss:gap-6 gap-6'>
                <motion.div variants={textVariant()}
                className='flex justify-center items-start md:gap-6
                ss:gap-6 gap-4 flex-col'
                >
                    <h1 className='text-white font-bold md:text-[60px]
                    ss:text-[50px] text-[33px] md:leading-[73px] 
                    ss:leading-[65px] leading-[38px]
                    md:max-w-[650px]'>
                        Buy your <span className='text-secondary'>
                        tiles, marble, granite, sanitary wares,
                        floor materials </span> 
                        and lots more.
                    </h1>

                    <p className='text-white md:text-[19px] md:leading-[28px] 
                    ss:leading-[28px] leading-[18px] ss:text-[19px] 
                    text-[14px] md:max-w-[630px] ss:max-w-[620px]
                    max-w-[320px]'>
                        Buy your desired tiles, marble, granite, sanitary
                        wares, doors, wall and flooring materials. We've
                        got you covered with a wide selection of
                        high-quality products to make your dream home a 
                        reality.
                    </p>

                    <div className='flex flex-row bg-main2 w-full
                    rounded-[10px] border-[1px] border-primaryalt py-2 
                    px-2 gap-3 justify-between items-center'>
                        <IoSearchOutline
                            className='text-main md:text-[22px]
                            ss:text-[22px] text-[25px]'
                        />

                        <input
                            type='search'
                            placeholder='Search for tiles, marble, granite,
                            floor and wall materials, etc.'
                            className='w-full text-black text-[15px]
                            placeholder:text-main3 outline-none
                            border-none bg-transparent
                            placeholder:text-[13px]'
                        />

                        <button className='bg-primary md:text-[15px]
                        ss:text-[15px] text-[12px] 
                        py-1.5 px-5 text-white rounded-[5px] grow4 
                        cursor-pointer justify-end'
                        // onClick={() => {
                        //     setToggle(!toggle);
                        // }}
                        >
                            Search
                        </button>
                    </div>     
                </motion.div>

                <motion.div variants={fadeIn('down', 'spring', 0.3)} 
                className='flex flex-1 ss:w-full relative'>
                    <div className="absolute md:-top-56 ss:top-6 top-6 
                    z-10">
                        <TargetedSearch />
                    </div>
                </motion.div>         
            </div>
            
        </div>
    </section>  
  )
};

export default SectionWrapper2(Hero, 'hero');
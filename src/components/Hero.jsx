import { useState, useEffect, useRef } from 'react';
import { heroImages, heroImagesMobile } from '../assets';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { IoSearchOutline } from "react-icons/io5";
import { SectionWrapper2 } from '../hoc';
import { TargetedSearch } from '../features';
import { useNavigate } from 'react-router-dom';
import { client } from '../sanity';


const Hero = () => {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1060);
  const [heroHeight, setHeroHeight] = useState('80vh');
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        const query = `
          *[_type == "product" && name match "${searchTerm}*"] {
            name,
            slug,
            "categorySlug": category->slug.current
          }
        `;
        const results = await client.fetch(query);
        setSuggestions(results);
        setIsDropdownOpen(true);
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  const handleSearchInput = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSuggestionClick = (categorySlug, productSlug) => {
      navigate(`/products/${categorySlug}/${productSlug}`);
      setSearchTerm('');
      setIsDropdownOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

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
      if (isMobile) {
        setHeroHeight('65vh');
      } else if (viewportHeight >= 700 && viewportHeight <= 810) {
        setHeroHeight('100vh');
      } else {
        setHeroHeight('80vh');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [images.length, isMobile]);

  return (
    <section className='relative w-full md:min-h-[700px] ss:min-h-[800px] 
    items-center flex md:mb-0 ss:mb-52 mb-36'>
        <div className={`relative items-center w-full max-w-[82rem] p-6
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
            justify-between w-full flex md:flex-row flex-col md:gap-32 
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

                    <p className='text-white md:text-[18px] md:leading-[28px] 
                    ss:leading-[28px] leading-[18px] ss:text-[18px] 
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
                    px-2 gap-3 justify-between items-center relative'>
                      <IoSearchOutline
                          className='text-main md:text-[22px]
                          ss:text-[22px] text-[25px]'
                      />

                      <input
                          type='search'
                          placeholder='Search for tiles, marble, granite,
                          floor and wall materials, etc.'
                          className='w-full text-black text-[14px]
                          placeholder:text-main3 outline-none
                          border-none bg-transparent
                          placeholder:text-[13px]'
                          value={searchTerm}
                          onChange={handleSearchInput}
                      />

                      <button className='bg-primary md:text-[14px]
                      ss:text-[15px] text-[12px] 
                      py-1.5 px-5 text-white rounded-[5px] grow4 
                      cursor-pointer justify-end'
                      // onClick={() => {
                      //     setToggle(!toggle);
                      // }}
                      >
                          Search
                      </button>

                      {isDropdownOpen && suggestions.length > 0 && (
                        <div className='absolute top-full mt-1 z-20
                        bg-main2 shadow-lg left-0 right-0 p-3 max-h-60 
                        overflow-y-auto rounded-md'>
                          {suggestions.map((suggestion) => (
                            <div
                              key={suggestion.slug.current}
                              className='md:p-1.5 ss:p-1.5 p-1 
                              hover:bg-white font-medium
                              cursor-pointer text-main md:text-[15px]
                              ss:text-[15px] text-[13px]'
                              onClick={() => handleSuggestionClick(suggestion.categorySlug, suggestion.slug.current)}
                            >
                              {suggestion.name}
                            </div>
                          ))}
                        </div>
                      )}
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
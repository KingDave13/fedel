import { useState, useEffect } from 'react';
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
// import { hero } from '../assets';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='relative w-full md:min-h-[890px] ss:min-h-[800px] 
    items-center flex overflow-hidden'>
        <div className='relative items-center w-full max-w-[86rem]' 
        >
            <div className='relative items-center justify-between w-full
            flex md:flex-row flex-col gap-5'>
                <motion.div variants={textVariant()}
                className={`${layout.sectionInfo}`}
                >
                    <h1 className='text-secondary font-bold md:text-[65px]
                    ss:text-[50px] text-[40px] md:leading-[78px] 
                    ss:leading-[55px] leading-[45px]
                    tracking-tight md:max-w-[750px]'>
                        No. 1 <span className='text-white'>
                        foam accessories and general </span> 
                        industrial materials supplier.
                    </h1>

                    <p className='md:mt-8 ss:mt-8 mt-5 text-white md:text-[19px]
                    ss:text-[20px] text-[14px] md:max-w-[600px] ss:max-w-[620px]
                    max-w-[320px]'>
                    We are the number one suppliers of top quality industrial
                    materials for various applications including mattress 
                    making, PVCs and lots more.
                    </p>

                    <div className='flex flex-row mt-5 md:gap-5 ss:gap-5 gap-2'>
                        <button className='bg-secondary grow2 md:text-[17px] 
                        ss:text-[17px] text-[14px] md:py-3 ss:py-3 py-2 
                        md:px-14 ss:px-14 px-6 text-primary rounded-[3px]
                        font-medium border-none hover:text-white'
                        onClick={() => navigate('/about')}
                        >
                            Learn More
                        </button>

                        <button className='border-[1px] grow2 border-secondary 
                        md:text-[17px] ss:text-[17px] text-[14px] md:py-3 
                        ss:py-3 py-2 md:px-14 ss:px-14 px-6 text-secondary 
                        rounded-[3px] font-medium hover:text-white'
                        onClick={() => navigate('/contact')}>
                            Get in Touch
                        </button>
                    </div>           
                </motion.div>

                {/* <motion.div variants={fadeIn('right', 'spring', 0.3)}
                className='md:flex hidden'>
                    <img src={hero} alt='hero'
                    className=' h-[600px] w-auto'
                    />
                </motion.div>           */}
            </div>
            
        </div>
    </section>  
  )
};

export default SectionWrapper(Hero, 'home');
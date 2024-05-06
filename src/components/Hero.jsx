import { useState, useEffect } from 'react';
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { IoSearchOutline } from "react-icons/io5";
import { SectionWrapper } from '../hoc';
import { TargetedSearch } from '../features';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='relative w-full md:min-h-[700px] ss:min-h-[800px] 
    items-center flex'>
        <div className='relative items-center w-full max-w-[86rem] hero
        md:mt-28 ss:mt-56 mt-44 rounded-[30px] flex md:p-12'>
            <div className='relative items-center justify-between w-full
            flex md:flex-row flex-col gap-44'>
                <motion.div variants={textVariant()}
                className='flex justify-center items-start md:gap-6
                flex-col'
                >
                    <h1 className='text-white font-bold md:text-[60px]
                    ss:text-[50px] text-[40px] md:leading-[73px] 
                    ss:leading-[55px] leading-[45px]
                    md:max-w-[650px]'>
                        Buy your <span className='text-secondary'>
                        tiles, marble, granite, sanitary wares,
                        floor materials </span> 
                        and lots more.
                    </h1>

                    <p className='text-white md:text-[19px] md:leading-[28px] 
                    ss:leading-[55px] leading-[45px] ss:text-[20px] 
                    text-[14px] md:max-w-[630px] ss:max-w-[620px]
                    max-w-[320px]'>
                        Buy your desired tiles, marble, granite, sanitary
                        wares, doors, wall and flooring materials. We've
                        got you covered with a wide selection of
                        high-quality products to make your dream home a 
                        reality.
                    </p>

                    <div className='flex flex-row bg-main2 w-full
                    rounded-[10px] border-[1px] border-primaryalt 
                    py-2 px-2 gap-3 justify-between items-center'>
                        <IoSearchOutline
                            className='text-main text-[22px]'
                        />

                        <input
                            type='search'
                            placeholder='Search for tiles, marble, granite,
                            floor and wall materials, etc.'
                            className='w-full text-black text-[15px]
                            placeholder:text-mainalt outline-none
                            border-none bg-transparent
                            placeholder:text-[13px]'
                        />

                        <button className='bg-primary text-[15px] 
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

                <motion.div variants={fadeIn('left', 'spring', 0.3)} className='flex flex-1 relative'>
                    <div className="absolute -top-56 z-10">
                    <TargetedSearch />
                    </div>
                </motion.div>         
            </div>
            
        </div>
    </section>  
  )
};

export default SectionWrapper(Hero, 'hero');
import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client } from '../sanity';
import { arrowRight } from '../assets';

const CatCard = (category, index) => {
    
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='flex items-center justify-center
            md:gap-10 ss:gap-8 gap-6'>
                <img 
                    src={category.image}
                    alt='Category'
                    className='md:w-[170px] ss:w-[160px] w-[140px] 
                    md:h-[170px] ss:h-[160px] h-[140px] object-cover'
                />

                <div className='flex flex-col md:gap-3 ss:gap-3
                gap-2 tracking-tight'>
                    <h1 className='text-primary md:text-[22px] ss:text-[20px] 
                    text-[16px] font-bold'>
                        {category.title}
                    </h1>

                    <p className='text-main font-medium md:leading-[23px]
                    ss:leading-[25px] leading-[18px] md:text-[17px] 
                    ss:text-[15px] text-[13px]'>
                        {category.description}
                    </p>

                    <a href='' 
                    className='flex gap-3 cursor-pointer grow5
                    items-center'>
                        <h1 className='text-primary md:text-[15px] 
                        ss:text-[15px] text-[13px] font-medium'>
                            See products
                        </h1>
                        
                        <img src={arrowRight} alt='arrow'/>
                    </a>
                </div>
            </div>
        </motion.div>
    )
};

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const query = '*[_type == "categories"]';

        client.fetch(query)
            .then((data) => setCategories(data))
    }, []);

  return (
    <section className='relative w-full min-h-[700px] mx-auto flex
    items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col'>
            <motion.div variants={textVariant()}>
                <h1 className='text-primary font-bold md:text-[43px]
                ss:text-[40px] text-[30px] tracking-tight md:leading-[60px] 
                ss:leading-[45px] leading-[35px]'>
                    Explore Categories
                </h1>  
            </motion.div>

            <div className='grid md:gap-16 ss:gap-14 gap-10 md:mt-20 
            md:grid-cols-3 ss:mt-12 mt-8 w-full'>
                {categories.map((category, index) => (
                    <CatCard 
                        key={index} 
                        index={index} 
                        {...category}
                    />
                ))}
            </div>
        </div>
    </section>
  )
};

export default SectionWrapper(Categories, '');
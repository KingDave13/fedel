import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { GoArrowRight } from "react-icons/go";

const TopCard = (top, index) => {
    
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}
        className='cursor-pointer grow2'>
            <div className='flex items-center justify-center relative'
            >
                <img 
                    src={urlFor(top.image)}
                    alt={top.name}
                    className='h-[250px] w-full object-cover
                    rounded-lg'
                />
            </div>
        </motion.div>
    )
};

const RelatedProducts = () => {

    const [top, setTop] = useState([]);

    useEffect(() => {
        const query = `
          *[_type == "top"] | order(_createdAt asc) {
            name,
            image
          }
        `;
    
        client.fetch(query)
            .then((data) => setTop(data))
    }, []);

  return (
    <section className='relative w-full md:min-h-[300px] ss:min-h-[300px] 
    min-h-[800px] mx-auto flex items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <motion.div variants={textVariant()}>
                <h1 className='text-primary font-bold md:text-[43px]
                ss:text-[40px] text-[30px] tracking-tight md:leading-[60px] 
                ss:leading-[45px] leading-[35px]'>
                    Related Products
                </h1>
            </motion.div>

            <div className='flex md:gap-8 ss:gap-12 gap-8'>
                {top.map((top, index) => (
                    <TopCard 
                        key={index} 
                        index={index}
                        {...top}
                    />
                ))}
            </div>
            
            <div>
                <a href='/products'
                className='inline-flex gap-3 md:mt-16 ss:mt-14 mt-10 
                items-center justify-center grow4'>
                    <p className='text-primary md:text-[16px] ss:text-[15px] 
                    text-[12px]'>
                        See more products
                    </p>

                    <GoArrowRight
                        className='text-white md:text-[18px]
                        ss:text-[18px] text-[20px]'
                    />
                </a>
            </div>
        </div>
    </section>
  )
};

export default SectionWrapper(RelatedProducts, '');
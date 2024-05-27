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
                <h1 className='text-primary font-bold md:text-[30px]
                ss:text-[30px] text-[20px] tracking-tight'>
                    Explore related products
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
            
            <div className='w-full flex items-center justify-center'>
                <button className='bg-primary text-[14px] py-3.5
                text-white rounded-lg grow4 cursor-pointer w-[180px]'
                // onClick={() => {
                //     setToggle(!toggle);
                // }}
                >
                    See more products
                </button>
            </div>
            
        </div>
    </section>
  )
};

export default SectionWrapper(RelatedProducts, '');
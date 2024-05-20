import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { arrowRight } from '../assets';

const CatCard = (category, index) => {
    
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='flex items-center justify-center relative'
            >
                <img 
                    src={urlFor(category.image)}
                    alt={category.name}
                    className='md:h-[230px] w-full object-cover
                    rounded-2xl'
                />

                <div className='rounded-full bg-white p-2 top-0 right-0'>
                    {category.productCount}
                </div>

                <div className='flex flex-col md:gap-1 ss:gap-1
                gap-1 tracking-tight absolute md:p-6 ss:p-6 p-4 bottom-0'>
                    <h1 className='text-secondary md:text-[19px] ss:text-[18px] 
                    text-[15px] font-bold'>
                        {category.name}
                    </h1>

                    <p className='text-white md:leading-[19px]
                    ss:leading-[19px] leading-[15px] md:text-[14px] 
                    ss:text-[14px] text-[12px]'>
                        {category.description}
                    </p>

                    <a href='/' 
                    className='flex gap-3 cursor-pointer grow5
                    items-center'>
                        <h1 className='text-white md:text-[14px] 
                        ss:text-[14px] text-[12px] font-medium'>
                            See products
                        </h1>
                        
                        <img src={arrowRight} alt='arrow' 
                        className='w-5 h-5'/>
                    </a>
                </div>
            </div>
        </motion.div>
    )
};

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const query = `
          *[_type == "category"] | order(_createdAt asc) {
            name,
            description,
            image,
            "productCount": count(*[_type == "product" && references(^._id)])
          }
        `;
    
        client.fetch(query)
            .then((data) => setCategories(data))
    }, []);

  return (
    <section className='relative w-full min-h-[1000px] mx-auto flex
    items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <motion.div variants={textVariant()}
            className=''>
                <h1 className='text-primary font-bold md:text-[43px]
                ss:text-[40px] text-[30px] tracking-tight md:leading-[60px] 
                ss:leading-[45px] leading-[35px]'>
                    Explore Categories
                </h1>  
            </motion.div>

            <div className='grid md:gap-14 ss:gap-12 gap-10 md:mt-16 
            md:grid-cols-3 ss:mt-12 mt-8'>
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
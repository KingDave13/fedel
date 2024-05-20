import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { GoArrowRight } from "react-icons/go";

const CatCard = (category, index) => {
    
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}
        className='hover:shadow-xl'>
            <div className='flex items-center justify-center relative'
            >
                <img 
                    src={urlFor(category.image)}
                    alt={category.name}
                    className='h-[230px] w-full object-cover
                    rounded-xl'
                />

                <div className='absolute inset-0 bg-gradient-to-b 
                    from-transparent to-black opacity-100 rounded-xl'>
                </div>

                <div className='rounded-full bg-white p-1.5 top-6 right-6
                absolute text-primary md:text-[13px] ss:text-[13px] 
                text-[12px] font-bold'>
                    {category.productCount}+
                </div>

                <div className='flex flex-col md:gap-1 ss:gap-1 gap-1 
                tracking-tight absolute md:p-6 ss:p-6 p-4 bottom-0'>
                    <h1 className='text-secondary md:text-[19px] ss:text-[18px] 
                    text-[15px] font-bold'>
                        {category.name}
                    </h1>

                    <p className='text-white md:leading-[19px]
                    ss:leading-[19px] leading-[16px] md:text-[14px] 
                    ss:text-[14px] text-[12px]'>
                        {category.description}
                    </p>

                    <a href='/' 
                    className='flex gap-3 cursor-pointer grow2
                    items-center mt-1.5'>
                        <h1 className='text-white md:text-[14px] 
                        ss:text-[14px] text-[12px] font-medium'>
                            See products
                        </h1>
                    </a>
                </div>
            </div>
        </motion.div>
    )
};

const Top = () => {

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
    <section className='relative w-full md:min-h-[1100px] ss:min-h-[1000px] 
    min-h-[2500px] mx-auto flex items-center md:mt-0 ss:mt-0 mt-80'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <motion.div variants={textVariant()}
            className='md:gap-4 ss:gap-3 gap-3 flex flex-col items-center'>
                <h1 className='text-secondary font-bold md:text-[43px]
                ss:text-[40px] text-[30px] tracking-tight md:leading-[60px] 
                ss:leading-[45px] leading-[35px]'>
                    Top Floor and Wall Tiles for You
                </h1>
                <p className='text-white md:text-[18px] ss:text-[17px] 
                text-[14px] md:leading-[25px] ss:leading-[25px] 
                leading-[20px] md:max-w-[1000px] ss:max-w-[700px]
                md:text-center'>
                    Explore the top rated tiles from this week 
                    handpicked just for you whether its marble 
                    or granite, ceramic, gloss or whatever - 
                    we have the right product for you.
                </p>
            </motion.div>

            <div className='grid md:gap-14 ss:gap-12 gap-8 md:mt-16 
            md:grid-cols-3 ss:mt-12 mt-8'>
                {categories.map((category, index) => (
                    <CatCard 
                        key={index} 
                        index={index}
                        {...category}
                    />
                ))}
            </div>

            <a href='/products'
            className='flex gap-3 md:mt-14 ss:mt-14 mt-10 
            items-center justify-center grow4'>
                <p className='text-white md:text-[16px] ss:text-[15px] 
                text-[12px]'>
                    See all products
                </p>

                <GoArrowRight
                    className='text-white md:text-[18px]
                    ss:text-[18px] text-[20px]'
                />
            </a>
        </div>
    </section>
  )
};

export default SectionWrapper(Top, '');
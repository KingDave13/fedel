import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { arrowRight } from '../assets';

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
                    className='md:h-[250px] h-[230px] w-full object-cover
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

                <div className='flex flex-col gap-1 absolute md:p-6 
                ss:p-6 p-4 bottom-0'>
                    <h1 className='text-secondary md:text-[19px] ss:text-[18px] 
                    text-[15px] font-bold'>
                        {category.name}
                    </h1>

                    <p className='text-white md:leading-[19px]
                    ss:leading-[19px] leading-[16px] md:text-[14px] 
                    ss:text-[13px] text-[12px]'>
                        {category.description}
                    </p>

                    <div>
                        <a href={`/products/${category.slug.current}`} 
                        className='inline-flex gap-3 cursor-pointer grow2
                        items-center mt-1.5'>
                            <h1 className='text-white md:text-[14px] 
                            ss:text-[14px] text-[12px] font-medium'>
                                See products
                            </h1>
                            
                            <img src={arrowRight} alt='arrow' 
                            className='md:w-5 w-4 md:h-5 h-4'/>
                        </a>
                    </div>
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
            slug,
            "productCount": count(*[_type == "product" && references(^._id)])
          }
        `;
    
        client.fetch(query)
            .then((data) => setCategories(data))
    }, []);

  return (
    <section className='relative w-full md:min-h-[1000px] ss:min-h-[1000px] 
    min-h-[2500px] mx-auto flex items-center md:mt-0 ss:mt-76 mt-80'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <div>
                <h1 className='text-primary font-bold md:text-[43px]
                ss:text-[40px] text-[30px] tracking-tight md:leading-[60px] 
                ss:leading-[45px] leading-[35px]'>
                    Explore Categories
                </h1>  
            </div>

            <div className='grid md:gap-14 ss:gap-10 gap-8 md:mt-16 
            md:grid-cols-3 ss:grid-cols-2 ss:mt-12 mt-8'>
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
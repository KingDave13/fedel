import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { GoArrowRight } from "react-icons/go";

const TopCard = ({ product, index }) => {
    const imageUrl = product.images && product.images[0] ? urlFor(product.images[0]).url() : '';

    return (
        <motion.div
            variants={fadeIn('', 'spring', index * 0.3, 0.75)}
            className='cursor-pointer grow2'
        >
            <a href={`/products/${product.categorySlug}/${product.slug.current}`}>
                <div className='flex items-center justify-center relative'>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className='h-[250px] w-full object-cover 
                            rounded-lg'
                        />
                    ) : (
                        <div className='flex items-center justify-center 
                        bg-gray-200 rounded-lg w-full h-[250px]'>
                            <span>No Image</span>
                        </div>
                    )}
                </div>
            </a>
        </motion.div>
    );
};

const Top = () => {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const query = `
            *[_type == "top"]{
                title,
                products[]->{
                    _id,
                    name,
                    images,
                    slug,
                    "categorySlug": category->slug.current
                }
            }
        `;

        client.fetch(query)
            .then((data) => {
                setTopProducts(data[0]?.products || []);
            })
            .catch((error) => console.error('Error fetching top products:', error));
    }, []);

    return (
        <section className='relative w-full md:min-h-[900px] 
        ss:min-h-[1000px] min-h-[800px] mx-auto flex items-center'>
            <div className='max-w-[86rem] mx-auto flex flex-col w-full
             items-center'>
                <motion.div variants={textVariant()} className='md:gap-4 
                ss:gap-3 gap-3 flex flex-col items-center'>
                    <h1 className='text-secondary font-bold 
                    md:text-[43px] ss:text-[40px] text-[30px] 
                    tracking-tight md:leading-[60px] ss:leading-[45px] 
                    leading-[35px]'>
                        Top Floor and Wall Tiles for you
                    </h1>
                    <p className='text-white md:text-[18px] 
                    ss:text-[17px] text-[14px] md:leading-[25px] 
                    ss:leading-[25px] leading-[20px] md:max-w-[1000px] 
                    ss:max-w-[700px] md:text-center'>
                        Explore the top rated tiles from this week 
                        handpicked just for you whether its marble 
                        or granite, ceramic, gloss or whatever - 
                        we have the right product for you.
                    </p>
                </motion.div>

                <div className='grid md:gap-12 ss:gap-12 gap-8 md:mt-16 
                md:grid-cols-4 ss:mt-12 mt-8'>
                    {topProducts.map((product, index) => (
                        <TopCard 
                            key={product._id} 
                            index={index} 
                            product={product}
                        />
                    ))}
                </div>
                
                <div>
                    <a href='/products' className='inline-flex gap-3 
                    md:mt-16 ss:mt-14 mt-10 items-center justify-center 
                    grow4'>
                        <p className='text-white md:text-[16px] 
                        ss:text-[15px] text-[12px]'>
                            See all products
                        </p>

                        <GoArrowRight 
                            className='text-white m
                            d:text-[18px] ss:text-[18px] text-[20px]' 
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(Top, '');
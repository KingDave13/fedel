import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { Link } from 'react-router-dom';

const ImageCard = ({ image, name, index, slug, categorySlug }) => {
    const imageUrl = image ? urlFor(image).url() : '';

    return (
        <motion.div
            variants={fadeIn('', 'spring', index * 0.2, 0.75)}
            className='cursor-pointer grow2'
        >
            <Link to={`/products/${categorySlug}/${slug}`}>
                <div className='flex items-center justify-center 
                relative'>
                    {imageUrl ? (
                        <img 
                            src={imageUrl}
                            alt={name}
                            className='h-[250px] w-full object-cover 
                            rounded-lg'
                        />
                    ) : (
                        <div className='h-[250px] w-full flex 
                        items-center justify-center bg-gray-200 
                        rounded-lg'>
                            <span>No Image</span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

const RelatedProducts = ({ categoryId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const query = `
            *[_type == "product" && references($categoryId)] {
                _id,
                name,
                images,
                slug,
                "categorySlug": category->slug.current
            }
        `;
        client.fetch(query, { categoryId })
            .then((data) => {
                console.log('Fetched related products:', data);
                setRelatedProducts(data);
            })
            .catch((error) => console.error('Error fetching related products:', error));
    }, [categoryId]);

    return (
        <section className='relative w-full md:min-h-[300px] 
        ss:min-h-[300px] min-h-[800px] mx-auto flex items-center'>
            <div className='max-w-[86rem] mx-auto flex flex-col w-full
             md:gap-10'>
                <motion.div variants={textVariant()}>
                    <h1 className='text-primary font-bold md:text-[30px] 
                    ss:text-[30px] text-[20px] tracking-tight'>
                        Explore related products
                    </h1>
                </motion.div>

                <div className='flex md:gap-8 ss:gap-12 gap-8'>
                    {relatedProducts.map((item, index) => (
                        <ImageCard 
                            key={item._id} 
                            index={index}
                            image={item.images && item.images[0]}
                            name={item.name}
                            slug={item.slug.current}
                            categorySlug={item.categorySlug}
                        />
                    ))}
                </div>
                
                <div className='w-full flex items-center justify-center'>
                    <button className='bg-primary text-[14px] py-3.5 
                    text-white rounded-lg grow4 cursor-pointer w-[180px]'>
                        See more products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(RelatedProducts, '');
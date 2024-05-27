import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { Link, useNavigate } from 'react-router-dom';

const ImageCard = ({ image, name, slug, categorySlug }) => {
    const imageUrl = image ? urlFor(image).url() : '';

    return (
        <div className='cursor-pointer grow2'>
            <Link to={`/products/${categorySlug}/${slug}`}>
                <div className=''>
                    {imageUrl ? (
                        <img 
                        src={imageUrl}
                        alt={name}
                        className='rounded-lg'
                        style={{ width: '100%', height: '100%' }} // Temporary inline styles
                    />
                    ) : (
                        <div className='square-image flex items-center 
                        justify-center bg-gray-200 rounded-lg'>
                            <span>No Image</span>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

const RelatedProducts = ({ categoryId, categorySlug }) => {

    const Navigate = useNavigate();
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
                    {relatedProducts.map((item) => (
                        <ImageCard 
                            key={item._id}
                            image={item.images && item.images[0]}
                            name={item.name}
                            slug={item.slug.current}
                            categorySlug={item.categorySlug}
                        />
                    ))}
                </div>
                
                <div className='w-full flex items-center justify-center'>
                    <button className='bg-primary text-[14px] py-3.5 
                    text-white rounded-lg grow4 cursor-pointer w-[180px]'
                    onClick={() => Navigate(`/products/${categorySlug}`)}
                    >
                        See more products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(RelatedProducts, '');
import { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { CgArrowLeft } from "react-icons/cg";
import { Link } from 'react-router-dom';

const ImageCard = ({ image, name, slug, categorySlug }) => {
    const imageUrl = image ? urlFor(image).url() : '';

    return (
        <div className='cursor-pointer grow2'>
            <Link to={`/products/${categorySlug}/${slug}`}>
                {imageUrl ? (
                    <div className='w-[200px] h-[200px]'>
                        <img 
                            src={imageUrl}
                            alt={name}
                            className='rounded-lg object-cover w-full 
                            h-full'
                        />
                    </div>
                ) : (
                    <div className='flex items-center justify-center 
                    bg-gray-200 rounded-lg w-[200px] h-[200px]'>
                        <span>No Image</span>
                    </div>
                )}
            </Link>
        </div>
    );
};

const RelatedProducts = ({ categoryId, categorySlug }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const carouselRef = useRef(null);

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
                setRelatedProducts(data);
            })
            .catch((error) => console.error('Error fetching related products:', error));
    }, [categoryId]);

    const scrollLeft = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;
            carouselRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;
            carouselRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

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

                <div className='relative flex items-center'>
                    <button 
                        className='absolute left-6 z-10 bg-main 
                        text-white p-3 rounded-full opacity-90 
                        hover:opacity-100 navsmooth'
                        onClick={scrollLeft}
                    >
                        <CgArrowLeft size={18} />
                    </button>
                    <div 
                        className='overflow-hidden w-full flex'
                        ref={carouselRef}
                    >
                        <div className='flex gap-6'>
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
                    </div>
                    <button 
                        className='absolute right-6 z-10 bg-main 
                        text-white p-3 rounded-full opacity-90 
                        hover:opacity-100 navsmooth'
                        onClick={scrollRight}
                    >
                        <CgArrowLeft size={18} 
                            className="transform rotate-180"
                        />
                    </button>
                </div>
                
                <div className='w-full flex items-center justify-center'>
                    <Link to={`/products/${categorySlug}`}
                        className='bg-primary text-[14px] py-3.5 text-center text-white rounded-lg grow4 cursor-pointer w-[180px]'
                    >
                        See more products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(RelatedProducts, '');
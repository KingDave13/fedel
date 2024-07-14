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
            <a href={`/products/${categorySlug}/${slug}`}>
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
            </a>
        </div>
    );
};

const MoreProducts = () => {
    const [moreProducts, setMoreProducts] = useState([]);
    const carouselRef = useRef(null);
    const itemRef = useRef(null);

    useEffect(() => {
        const query = `
            *[_type == "product"] | order(_createdAt desc) [0...50] {
                _id,
                name,
                images,
                slug,
                "categorySlug": category->slug.current
            }
        `;
        
        client.fetch(query)
            .then((data) => {
                const shuffledProducts = data.sort(() => 0.5 - Math.random()).slice(0, 10); // Take 10 random products
                setMoreProducts(shuffledProducts);
            })
            .catch((error) => console.error('Error fetching random products:', error));
    }, []);

    const scrollLeft = () => {
        if (carouselRef.current && itemRef.current) {
            const itemWidth = itemRef.current.clientWidth + 24;
            carouselRef.current.scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current && itemRef.current) {
            const itemWidth = itemRef.current.clientWidth + 24;
            carouselRef.current.scrollBy({
                left: itemWidth,
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
                        Explore more products
                    </h1>
                </motion.div>

                <div className='relative flex items-center'>
                    <button 
                        className='absolute left-6 z-10 bg-main 
                        text-white p-3 rounded-full opacity-90 
                        hover:opacity-100'
                        onClick={scrollLeft}
                    >
                        <CgArrowLeft size={18} />
                    </button>
                    <div className='overflow-hidden w-full flex' ref={carouselRef}>
                        <div className='flex gap-6'>
                            {moreProducts.map((item, index) => (
                                <div key={item._id} ref={index === 0 ? itemRef : null}>
                                    <ImageCard 
                                        image={item.images && item.images[0]}
                                        name={item.name}
                                        slug={item.slug.current}
                                        categorySlug={item.categorySlug}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button 
                        className='absolute right-6 z-10 bg-main 
                        text-white p-3 rounded-full opacity-90 
                        hover:opacity-100'
                        onClick={scrollRight}
                    >
                        <CgArrowLeft size={18} className="transform 
                        rotate-180" />
                    </button>
                </div>
                
                <div className='w-full flex items-center justify-center'>
                    <Link to={`/products`}
                        className='bg-primary text-[14px] py-3.5 
                        text-center text-white rounded-lg grow2 
                        cursor-pointer w-[180px]'
                    >
                        See more products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(MoreProducts, '');
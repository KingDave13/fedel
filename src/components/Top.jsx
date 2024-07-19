import { useState, useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client, urlFor } from '../sanity';
import { whatsapplogo, gmaillogo } from "../assets";
import { GoArrowRight } from "react-icons/go";
import { CgArrowLeft } from "react-icons/cg";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1060);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const TopCard = ({ product, index, mobileProduct, onNext, onPrev }) => {
    const imageUrl = product.images && product.images[0] ? urlFor(product.images[0]).url() : '';
    const [showAttributes, setShowAttributes] = useState(false);
    const isMobile = useIsMobile();

    return (
        <motion.div
            variants={!isMobile ? fadeIn('', 'spring', index * 0.3, 0.75) : {}}
            className='cursor-pointer'
        >
            {isMobile ? (
                <div className='bg-white p-5 rounded-lg'>
                    Hlo
                </div>
            ) : (
                <a href={`/products/${product.categorySlug}/${product.slug.current}`}>
                    <div className='flex items-center justify-center relative'
                        onMouseEnter={() => setShowAttributes(true)} 
                        onMouseLeave={() => setShowAttributes(false)}
                    >
                        <div className='flex items-center justify-center relative
                        w-full'>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className='h-[280px] w-full object-cover 
                                    rounded-lg'
                                />
                            ) : (
                                <div className='flex items-center justify-center 
                                bg-gray-200 rounded-lg w-full h-[250px]'>
                                    <span>No Image</span>
                                </div>
                            )}

                            <AnimatePresence>
                                {showAttributes && (
                                    <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 bg-black bg-opacity-80 
                                    p-4 rounded-lg flex flex-col">
                                        <div className='text-white absolute bottom-4'>
                                            <h3 className="text-[20px] font-bold mb-1">
                                                {product.name}
                                            </h3>

                                            {product.attributes.map((attribute, index) => (
                                                <div key={index} className='text-[14px] flex flex-col 
                                                gap-1 mb-1'>
                                                    {attribute.dimensions && <div>{attribute.dimensions}</div>}

                                                    <div className="flex gap-2">
                                                        {attribute.material && <div>{attribute.material}</div>} •
                                                        {attribute.manufacturer && <div>{attribute.manufacturer}</div>}
                                                    </div>
                                                    
                                                </div>
                                            ))}

                                            {product.attributes.map((attribute, index) => (
                                                <div key={index}>
                                                    {attribute.price !== null ? (
                                                        <div className='flex gap-2 items-center'>
                                                            {attribute.price && (
                                                                <h1 
                                                                className='text-greenBright text-[20px]
                                                                font-bold'>
                                                                    <div>
                                                                        <span className='line-through'>
                                                                            N
                                                                        </span>
                                                                        {attribute.price}.00
                                                                    </div>
                                                                </h1>
                                                            )}
                                                            
                                                            {attribute.OriginalPrice && (
                                                                <h1 className='text-main3 text-[14px]
                                                                font-medium line-through'>
                                                                    <div>
                                                                        N{attribute.OriginalPrice}.00
                                                                    </div>
                                                                </h1>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="bg-white rounded-md px-3 py-1.5 flex 
                                                        items-center gap-2 mt-2 justify-between">
                                                            <p className="text-primary font-bold
                                                            text-[15px]">
                                                                REQUEST PRICE
                                                            </p>

                                                            <img src={gmaillogo}
                                                                alt="gmail"
                                                                className="w-5 h-auto" 
                                                            />

                                                            <img src={whatsapplogo}
                                                                alt="whatsapp"
                                                                className="w-4 h-auto" 
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            <div className="text-[13px] text-white mt-1">
                                                Click for more details &rarr;
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </a>
            )}
        </motion.div>
    );
};


const Top = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onNext = () => {
        setCurrentIndex(currentIndex + 1);
    };
    
    const onPrev = () => {
        setCurrentIndex(currentIndex - 1);
    };
      

    useEffect(() => {
        const query = `
            *[_type == "top"]{
                title,
                products[]->{
                    _id,
                    name,
                    images,
                    slug,
                    attributes[]->{
                        price,
                        isDiscounted,
                        OriginalPrice,
                        dimensions,
                        manufacturer,
                        type,
                        application,
                        material,
                        styleAndPattern,
                        },
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
             md:items-center'>
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

                <div className='md:grid md:gap-12 ss:gap-12 gap-8 md:mt-16 
                md:grid-cols-4 ss:grid-cols-2 ss:mt-12 mt-8'>
                    {topProducts.map((product, index) => (
                        <TopCard 
                            key={product._id} 
                            index={index} 
                            product={product}
                            mobileProduct={product[currentIndex]}
                            onNext={onNext}
                            onPrev={onPrev}
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
                            className='text-white md:text-[18px] 
                            ss:text-[18px] text-[20px]' 
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(Top, '');
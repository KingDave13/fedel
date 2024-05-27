import { SectionWrapperAlt } from '../hoc';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { shopping } from '../assets';
import { urlFor } from '../sanity';
import { TbWorldCheck, TbShieldCheck  } from "react-icons/tb";
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import { useSwipeable } from 'react-swipeable';


const ImageCard = ({ index, image, product, handleImageClick, remaining }) => {
    const imageUrl = urlFor(image).url();

    return (
        <motion.div
            variants={fadeIn('', 'spring', index * 0.2, 0.75)}
            className='cursor-pointer relative'
            onClick={() => handleImageClick(index)}
        >
            <div className='square-container'>
                <img
                    src={imageUrl}
                    alt={product.name}
                    className='rounded-xl'
                />
                {remaining > 0 && index === 3 && (
                    <div className='absolute inset-0 bg-black 
                    bg-opacity-70 rounded-xl flex items-center 
                    justify-center text-white font-bold md:text-[30px]'>
                        + {remaining}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Variation = ({ variation, index }) => {
    return (
      <motion.div variants={fadeIn('', 'spring', index * 0.5, 0.75)} 
      className='cursor-pointer'>
        <div className='border-[1px] border-primaryalt rounded-lg px-3.5
        py-2 hover:bg-primary text-main md:text-[14px] ss:text-[14px] 
        text-[12px] font-medium hover:text-white navsmooth'>
            <p className=''>
                {variation}
            </p>
        </div>
      </motion.div>
    );
};


const ProductDetails = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const hasPrice = product.attributes.some(attribute => attribute.price !== undefined);

    const openModal = (index) => {
        setScrollPosition(window.pageYOffset);
        setCurrentImageIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
        document.body.style.top = '0';
    };

    const navigateImage = (direction) => {
        if (direction === 'prev') {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
            );
        } else if (direction === 'next') {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => navigateImage('next'),
        onSwipedRight: () => navigateImage('prev'),
    });

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const imagesToShow = product.images.slice(0, 4);
    const remainingImages = product.images.length - 4;

  return (
    <section className='relative w-full min-h-[600px] mx-auto flex
    items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col gap-10'>
            <div className='flex items-center w-full bg-main2
            rounded-[20px] flex md:p-8 ss:p-8 p-6'>
                <div className='w-full flex flex-col gap-8'>
                    <div className='w-full flex gap-16'>
                        <div className='grid md:grid-cols-2 w-full gap-5'>
                            {imagesToShow.map((item, index) => (
                                <ImageCard
                                    key={index}
                                    index={index}
                                    image={item}
                                    product={product}
                                    handleImageClick={openModal}
                                    remaining={index === 3 ? remainingImages : 0}
                                />
                            ))}
                        </div>

                        <div className='w-full flex flex-col gap-4'>
                            <h1 className='text-main font-bold md:text-[30px]
                            ss:text-[30px] text-[20px]'>
                                {product.name}
                            </h1>

                            <div className="items-center">
                                <div className='bg-primaryalt w-full 
                                h-[1px]' />
                            </div>

                            <div>
                                {product.attributes.map((attribute, index) => (
                                    <div 
                                    className='md:text-[16px]
                                    ss:text-[15px] text-[13px]
                                    flex flex-col gap-1.5'
                                    key={index}>
                                        {attribute.type && <div><span className='font-semibold mr-1'>Type:</span> {attribute.type}</div>}
                                        {attribute.material && <div><span className='font-semibold mr-1'>Material:</span> {attribute.material}</div>}
                                        {attribute.dimensions && <div><span className='font-semibold mr-1'>Dimensions:</span> {attribute.dimensions}</div>}
                                        {attribute.application && <div><span className='font-semibold mr-1'>Application:</span> {attribute.application}</div>}
                                        {attribute.styleAndPattern && <div><span className='font-semibold mr-1'>Style:</span> {attribute.styleAndPattern}</div>}
                                        {attribute.manufacturer && <div><span className='font-semibold mr-1'>Manufacturer:</span> {attribute.manufacturer}</div>}
                                    </div>
                                ))}
                            </div>

                            <div className="items-center">
                                <div className='bg-primaryalt w-full 
                                h-[1px]' />
                            </div>

                            <div className='flex flex-col gap-4'>
                                {product.attributes.map((attribute, index) => (
                                    <div 
                                        className='flex gap-4 items-center' 
                                        key={index}
                                    >
                                        {attribute.price && (
                                            <h1 
                                            className='text-greenDeep 
                                            md:text-[32px] 
                                            ss:text-[30px] text-[20px] 
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
                                            <h1 className='text-main3 
                                            font-medium md:text-[22px] 
                                            ss:text-[20px] text-[15px] 
                                            line-through'>
                                                <div>
                                                    N{attribute.OriginalPrice}.00
                                                </div>
                                            </h1>
                                        )}
                                    </div>
                                ))}
                                
                                <p className='text-main font-bold
                                md:text-[16px] ss:text-[15px] text-[13px]'>
                                    Select Variation
                                </p>

                                <div>
                                    {product.attributes.map((attribute, index) => (
                                        <div
                                        className='flex flex-wrap gap-3
                                        md:max-w-[400px] ss:max-w-[300px]'
                                        key={index}>
                                            {attribute.variations && attribute.variations.map((variation, varIndex) => (
                                                <Variation 
                                                    key={varIndex}
                                                    variation={variation}
                                                    index={varIndex}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {product.attributes.map((attribute) => (
                                    <div className='bg-primary flex items-center grow5 py-3.5 
                                    rounded-lg cursor-pointer justify-center gap-3'
                                    // onClick={() => {
                                    //     setToggle(!toggle);
                                    // }}
                                    >
                                       {attribute.price === null ? (
                                            <p className='text-white 
                                            md:text-[14px] ss:text-[14px]
                                            text-[12px]'>
                                                Request Price
                                            </p>
                                        ) : (
                                            <div className='flex items-center
                                            gap-3'
                                            >
                                                <img src={shopping} 
                                                    className='text-white 
                                                    w-[20px] h-auto' 
                                                />
                                                <p className='text-white
                                                 md:text-[14px] 
                                                 ss:text-[14px] 
                                                 text-[12px]'>
                                                    Add to Cart
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className='flex flex-col border-primaryalt
                        border-[1px] rounded-xl gap-2 items-center
                        w-[150px] py-3.5'>
                            <TbWorldCheck 
                                className='text-primary text-[35px]'
                            />

                            <p className='text-primary font-semibold
                            text-[12px]'>
                                Worldwide Delivery
                            </p>
                        </div>

                        <div className='flex flex-col border-primaryalt
                        border-[1px] rounded-xl gap-2 items-center
                        w-[150px] py-3.5'>
                            <TbShieldCheck 
                                className='text-primary text-[35px]'
                            />

                            <p className='text-primary font-semibold
                            text-[12px]'>
                                1-Year Warranty
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center w-full bg-main2
            rounded-[20px] flex md:p-8 ss:p-8 p-6'>
                <motion.div variants={textVariant()}
                className='flex flex-col md:gap-6 ss:gap-5 gap-4'>
                    <h1 className='text-main font-bold md:text-[20px]
                    ss:text-[20px] text-[18px] tracking-tight'>
                        Product Description
                    </h1>

                    <div className="items-center justify-center">
                        <div className='bg-primaryalt w-full h-[1px]' />
                    </div>
                    
                    <p className='text-main md:text-[17px] ss:text-[17px] 
                    text-[14px] tracking-tight md:leading-[25px] 
                    ss:leading-[26px] leading-[20px] font-medium'>
                        {product.description}
                    </p>

                    <div className="items-center justify-center">
                        <div className='bg-primaryalt w-full h-[1px]' />
                    </div>

                    <div className='bg-primary flex items-center grow5 py-3.5 
                    rounded-lg cursor-pointer justify-center gap-3'
                    // onClick={() => {
                    //     setToggle(!toggle);
                    // }}
                    >
                        <img
                            src={shopping}
                            className='text-white
                            w-[20px] h-auto'
                        />

                        <p className='text-white md:text-[14px] ss:text-[14px] 
                        text-[12px]'>
                            Add to Cart
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>

        {isModalOpen && (
            <div className='fixed inset-0 z-50 flex items-center 
            justify-center bg-black bg-opacity-80'>
                <div className='relative w-full max-w-3xl' {...handlers} ref={modalRef}>
                    <button
                        className='absolute top-6 right-6 text-white 
                        md:text-[20px] hover:bg-main3 rounded-full p-3
                        hover:bg-opacity-50 navsmooth'
                        onClick={closeModal}
                    >
                        <HiX />
                    </button>

                    <button
                        className='absolute left-2 top-1/2 transform 
                        -translate-y-1/2 md:text-[23px] bg-main3 ml-6
                        rounded-full p-3 bg-opacity-50 navsmooth
                        text-white hover:bg-opacity-80'
                        onClick={() => navigateImage('prev')}
                    >
                        <HiChevronLeft />
                    </button>

                    <button
                        className='absolute right-2 top-1/2 transform 
                        -translate-y-1/2 md:text-[23px] bg-main3 mr-6
                        rounded-full p-3 bg-opacity-50 navsmooth
                        text-white hover:bg-opacity-80'
                        onClick={() => navigateImage('next')}
                    >
                        <HiChevronRight />
                    </button>

                    <img
                        src={urlFor(product.images[currentImageIndex]).url()}
                        alt={`${currentImageIndex + 1}`}
                        className='w-full h-auto max-h-[90vh] object-contain rounded-lg'
                    />

                    <div className='absolute bottom-4 left-1/2 
                    transform -translate-x-1/2 flex gap-2'>
                        {product.images.map((_, index) => (
                            <span
                                key={index}
                                className={`w-3 h-3 rounded-full 
                                ${index === currentImageIndex ? 
                                    'bg-secondary' : 
                                    'bg-main2'} cursor-pointer navsmooth`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )}
    </section>
  )
};

export default SectionWrapperAlt(ProductDetails, '');
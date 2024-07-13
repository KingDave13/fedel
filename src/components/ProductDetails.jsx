import { SectionWrapperAlt } from '../hoc';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { shopping, shoppingCheck } from '../assets';
import { urlFor } from '../sanity';
import { TbWorldCheck, TbShieldCheck  } from "react-icons/tb";
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useSwipeable } from 'react-swipeable';
import { useFormik } from "formik";
import { TiArrowSortedDown } from "react-icons/ti";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';


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

const Variation = ({ variation, index, selected, onSelect }) => {
    const handleClick = () => {
        onSelect(index);
    };
    
    return (
      <motion.div variants={fadeIn('', 'spring', index * 0.5, 0.75)} 
      className='cursor-pointer'>
        <div className={`border-[1px] border-primaryalt rounded-lg px-3.5
        py-2 hover:bg-primary text-main md:text-[14px] ss:text-[14px] 
        text-[12px] font-medium hover:text-white navsmooth
        ${selected ? 'bg-primary text-white' : ''}`}
        onClick={handleClick}
        >
            <p className=''>
                {variation}
            </p>
        </div>
      </motion.div>
    );
};

const Variation2 = ({ variation, index, selected, onSelect }) => {
    const handleClick = () => {
        onSelect(index);
    };

    return (
      <div className='cursor-pointer'>
        <div className={`border-[1px] border-primaryalt rounded-lg px-3.5
        py-2 hover:bg-primary text-main md:text-[13px] ss:text-[13px] 
        text-[12px] font-medium hover:text-white navsmooth
        ${selected ? 'bg-primary text-white' : ''}`}
        onClick={handleClick}
        >
            <p className=''>
                {variation}
            </p>
        </div>
      </div>
    );
};


const RequestModal = ({ onClose, product, image }) => {
    const [selectedVariations, setSelectedVariations] = useState([]);

    const handleSelectVariation = (index) => {
        setSelectedVariations((prev) =>
          prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const imageUrl = urlFor(image).url();

    const closeRequestModal = () => {
        onClose();
        document.body.style.overflow = 'auto';
        document.body.style.top = '0';
    }

    const formik = useFormik({
        initialValues: {
            state: '',
            name: '',
            email: '',
            phone: '',
        },

        validationSchema: Yup.object({
            state: Yup.string().required('State is required.'),
            name: Yup.string().required('Name is required.'),
            email: Yup.string().email('Invalid email address.').required('Email is required.'),
            phone: Yup.string().required('WhatsApp phone number is required.'),
        }),


    });

    return (
        <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-80 z-50">
                <motion.div 
                initial={{ y: 0, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-white md:p-8 ss:p-8 p-6 rounded-2xl 
                shadow-xl flex flex-col justify-center w-auto h-auto 
                items-center relative">
                    <button
                        className='absolute md:top-8 ss:top-8 top-6 
                        md:right-8 ss:right-8 right-6 text-main 
                        md:text-[20px] cursor-pointer'
                        onClick={closeRequestModal}
                    >
                        <HiX />
                    </button>

                    <div className='flex flex-col w-full gap-8'>
                        <h1 className='text-primary md:text-[20px]
                        ss:text-[20px] text-[18px] font-semibold'>
                            Request Price
                        </h1>

                        <div className='flex w-full justify-between gap-36'>
                            <div className='flex flex-col gap-6'>
                                <div className='bg-main2 p-3 flex items-center
                                gap-3 rounded-lg w-auto'>
                                    <HiOutlineInformationCircle 
                                        className='text-mainalt text-[22px]'
                                    />

                                    <p className='text-mainalt text-[14px]
                                    md:leading-[19px] ss:leading-[19px]
                                    leading-[18px] font
                                    md:max-w-[550px]'>
                                        Fill in the form to request a quote
                                        for the selected product. Confirm
                                        your variation settings, submit the
                                        form and we'll get back to you in 
                                        light's speed.
                                    </p>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <h1 className='text-main text-[15px]
                                    font-semibold'>
                                        Select Variation
                                    </h1>

                                    <div>
                                        {product.attributes.map((attribute, index) => (
                                            <div
                                            className='flex flex-wrap gap-3
                                            md:max-w-[400px] ss:max-w-[300px]'
                                            key={index}>
                                                {attribute.variations && attribute.variations.map((variation, varIndex) => (
                                                    <Variation2 
                                                        key={varIndex}
                                                        variation={variation}
                                                        index={varIndex}
                                                        selected={selectedVariations.includes(varIndex)}
                                                        onSelect={handleSelectVariation}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className='rounded-xl md:h-[200px]
                                    w-[200px] object-cover'
                                />

                                <div className='absolute bg-main2 w-full
                                bottom-0 flex items-center justify-center
                                md:p-3 rounded-b-xl'>
                                    <h1 className='text-main text-[15px]
                                    font-bold'>
                                        {product.name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className='w-4/5'>
                            <form onSubmit={formik.handleSubmit}
                            className='grid grid-cols-2 md:gap-5 ss:gap-5 
                            gap-4'>
                                <div className="flex flex-col">
                                    <label className="text-main mb-2 
                                    md:text-[14px] font-semibold
                                    ss:text-[14px] text-[13px]">
                                        State
                                    </label>

                                    <div className='relative flex items-center'>
                                        <select
                                            type="text"
                                            name="state"
                                            value={formik.values.state}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                            ss:px-3 px-2 border-search 
                                            text-main3 md:rounded-lg rounded-md 
                                            cursor-pointer md:text-[13px]
                                            ss:text-[13px] text-[11px] 
                                            bg-transparent w-full custom-select"
                                        >
                                            <option value="" disabled selected hidden>Select your state of residence</option>
                                            <option value="fct">FCT</option>
                                            <option value="abia">Abia</option>
                                            <option value="adamawa">Adamawa</option>
                                            <option value="akwaibom">Akwa Ibom</option>
                                            <option value="anambra">Anambra</option>
                                            <option value="bauchi">Bauchi</option>
                                            <option value="bayelsa">Bayelsa</option>
                                            <option value="benue">Benue</option>
                                            <option value="borno">Borno</option>
                                            <option value="crossriver">Cross River</option>
                                            <option value="delta">Delta</option>
                                            <option value="ebonyi">Ebonyi</option>
                                            <option value="edo">Edo</option>
                                            <option value="ekiti">Ekiti</option>
                                            <option value="enugu">Enugu</option>
                                            <option value="gombe">Gombe</option>
                                            <option value="imo">Imo</option>
                                            <option value="jigawa">Jigawa</option>
                                            <option value="kaduna">Kaduna</option>
                                            <option value="kano">Kano</option>
                                            <option value="katsina">Katsina</option>
                                            <option value="kebbi">Kebbi</option>
                                            <option value="kogi">Kogi</option>
                                            <option value="kwara">Kwara</option>
                                            <option value="lagos">Lagos</option>
                                            <option value="nasarawa">Nasarawa</option>
                                            <option value="niger">Niger</option>
                                            <option value="ogun">Ogun</option>
                                            <option value="ondo">Ondo</option>
                                            <option value="osun">Osun</option>
                                            <option value="oyo">Oyo</option>
                                            <option value="plateau">Plateau</option>
                                            <option value="rivers">Rivers</option>
                                            <option value="sokoto">Sokoto</option>
                                            <option value="taraba">Taraba</option>
                                            <option value="yobe">Yobe</option>
                                            <option value="zamfara">Zamfara</option>
                                        </select>
                                        <div className='absolute md:right-3 
                                        ss:right-3 right-2'>
                                            <TiArrowSortedDown 
                                                className='text-main md:text-[18px]
                                                ss:text-[18px] text-[16px]'
                                            />
                                        </div>
                                    </div>

                                    <p className="text-mainRed md:text-[12px] 
                                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                                        {formik.touched.state && formik.errors.state}
                                    </p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-main mb-2 
                                    md:text-[14px] font-semibold
                                    ss:text-[14px] text-[13px]">
                                        Enter your name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='Enter your full name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                        ss:px-3 px-2 border-search 
                                        text-black md:rounded-lg rounded-md md:text-[13px]
                                        ss:text-[13px] text-[11px]
                                        bg-transparent w-full placeholder:text-main3"
                                    />

                                    <p className="text-mainRed md:text-[12px] 
                                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                                        {formik.touched.name && formik.errors.name}
                                    </p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-main mb-2 
                                    md:text-[14px] font-semibold
                                    ss:text-[14px] text-[13px]">
                                        Enter your email
                                    </label>

                                    <input
                                        type="text"
                                        name="email"
                                        placeholder='Enter your email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                        ss:px-3 px-2 border-search 
                                        text-black md:rounded-lg rounded-md md:text-[13px]
                                        ss:text-[13px] text-[11px]
                                        bg-transparent w-full placeholder:text-main3"
                                    />

                                    <p className="text-mainRed md:text-[12px] 
                                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                                        {formik.touched.email && formik.errors.email}
                                    </p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-main mb-2 
                                    md:text-[14px] font-semibold
                                    ss:text-[14px] text-[13px]">
                                        Enter your WhatsApp phone number
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder='Enter WhatsApp phone number'
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                        ss:px-3 px-2 border-search 
                                        text-black md:rounded-lg rounded-md md:text-[13px]
                                        ss:text-[13px] text-[11px]
                                        bg-transparent w-full placeholder:text-main3"
                                    />

                                    <p className="text-mainRed md:text-[12px] 
                                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                                        {formik.touched.phone && formik.errors.phone}
                                    </p>
                                </div>
                            </form>
                        </div>

                        <div className='w-full flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                />
                                <p className='text-main md:text-[12px]
                                ss:text-[12px] text-[11px]'>
                                    I have read and agreed to Fedel Tiles 
                                    Limited's <a href='/privacypolicy' 
                                    className='font-bold cursor-pointer'>
                                    Privacy Policy
                                    </a> and <a href='/terms' 
                                    className='font-bold cursor-pointer'>
                                    Terms of Usage
                                    </a>
                                </p>
                            </div>

                            <button className='bg-primary text-[14px] py-3.5 
                            text-center text-white rounded-lg grow2 
                            cursor-pointer w-[180px]'>
                                Request Price
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const CartModal = ({ onClose }) => {
    const closeCartModal = () => {
        onClose();
        document.body.style.overflow = 'auto';
        document.body.style.top = '0';
    }

    return (
        <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-80 z-50">
                <motion.div 
                initial={{ y: 0, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-white md:p-8 ss:p-8 p-6 rounded-2xl 
                shadow-xl flex flex-col justify-center w-auto h-auto 
                items-center">
                    <button
                        className='text-main md:text-[20px] cursor-pointer
                        flex justify-end w-full'
                        onClick={closeCartModal}
                    >
                        <HiX />
                    </button>

                    <div className='flex flex-col w-full items-center'>
                        <img src={shoppingCheck} 
                            alt='cartCheck'
                            className='w-[60px] h-auto md:mb-6 ss:mb-6 mb-5' 
                        />

                        <h1 className='font-semibold text-primary md:text-[27px]
                        ss:text-[20px] text-[15px] mb-2'>
                            Product added to cart!
                        </h1>

                        <p className='text-main md:text-[14px] ss:text-[13px] 
                        text-[11px] font-medium md:mb-8 ss:mb-8 mb-6'>
                            The product you selected has been added to your
                            cart successfully.
                        </p>

                        <Link to='/cart' 
                        className='bg-primary text-[13px] py-3.5 flex
                        items-center justify-center text-white rounded-lg grow2 
                        cursor-pointer w-[150px] gap-3'>
                            <img src={shopping} 
                                alt='cart'
                                className='text-white 
                                w-[20px] h-auto' 
                            />

                            <p>
                                See cart
                            </p>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


const ProductDetails = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedVariations, setSelectedVariations] = useState([]);
    const dispatch = useDispatch();

    const handleAddToCartClick = () => {
        const cartItem = {
            id: product._id,
            name: product.name,
            image: product.images[0],
            type: product.attributes.type,
            manufacturer: product.attributes.manufacturer,
            variations: selectedVariations,
            price: product.attributes.price,
            OriginalPrice: product.attributes.OriginalPrice,
            quantity: 1,
        };
        dispatch(addToCart(cartItem));
        setIsCartModalOpen(true);
        setScrollPosition(window.pageYOffset);
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    };

    const handleSelectVariation = (index) => {
        setSelectedVariations((prev) =>
          prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };
      
    const handleRequestPriceClick = () => {
        setIsRequestModalOpen(true);
        setScrollPosition(window.pageYOffset);
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    };

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
                                                    selected={selectedVariations.includes(varIndex)}
                                                    onSelect={handleSelectVariation}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {product.attributes.map((attribute) => (
                                    <div>
                                        <div className='bg-primary flex items-center grow2 py-3.5 
                                        rounded-lg cursor-pointer justify-center gap-3'
                                        onClick={
                                            attribute.price === null ?
                                            handleRequestPriceClick : 
                                            handleAddToCartClick
                                        }
                                        >
                                            {attribute.price === null ? (
                                                <div className='flex items center gap-3'>
                                                    <p className='text-white 
                                                    md:text-[14px] ss:text-[14px]
                                                    text-[12px]'>
                                                        Request Price
                                                    </p>
                                                </div>
                                                
                                            ) : (
                                                <div className='flex items-center
                                                gap-3'
                                                >
                                                    <img src={shopping} 
                                                        alt='cart'
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

                                        <div className={` mt-5 gap-3
                                        ${attribute.price === null 
                                        ? 'flex'
                                        : 'hidden'}`}>
                                            <HiOutlineInformationCircle 
                                                className='text-mainalt text-[35px]'
                                            />

                                            <p className='text-mainalt md:text-[13px]
                                            ss:text-[13px] text-[12px] md:leading-[18px]
                                            ss:leading-[18px] leading-[16px]'>
                                                To get the price for this product, 
                                                select your desired variation and 
                                                click on the request quote button 
                                                above, fill in the contact form and 
                                                we'll get back to you in light's 
                                                speed.
                                            </p>
                                        </div>
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

                    {product.attributes.map((attribute) => (
                        <div>
                            <div className='bg-primary flex items-center grow2 py-3.5 
                            rounded-lg cursor-pointer justify-center gap-3'
                            onClick={
                                attribute.price === null ?
                                handleRequestPriceClick : 
                                handleAddToCartClick
                            }
                            >
                                {attribute.price === null ? (
                                    <div className='flex items center gap-3'>
                                        <p className='text-white 
                                        md:text-[14px] ss:text-[14px]
                                        text-[12px]'>
                                            Request Price
                                        </p>
                                        
                                    </div>
                                    
                                ) : (
                                    <div className='flex items-center
                                    gap-3'
                                    >
                                        <img src={shopping} 
                                        alt='cart'
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

                            <div className={` mt-5 gap-3 items-center
                            ${attribute.price === null 
                            ? 'flex'
                            : 'hidden'}`}>
                                <HiOutlineInformationCircle 
                                    className='text-mainalt text-[20px]'
                                />

                                <p className='text-mainalt md:text-[14px]
                                ss:text-[13px] text-[12px]'>
                                    To get the price for this product, 
                                    select your desired variation and 
                                    click on the request quote button 
                                    above, fill in the contact form and 
                                    we'll get back to you in light's 
                                    speed.
                                </p>
                            </div>
                        </div>
                    ))}
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

        {isRequestModalOpen && (
            <RequestModal 
                onClose={() => setIsRequestModalOpen(false)}
                product={product}
                image={product.images[0]}
            />
        )}

        {isCartModalOpen && (
            <CartModal
                onClose={() => setIsCartModalOpen(false)}
            />
        )}
    </section>
  )
};

export default SectionWrapperAlt(ProductDetails, '');
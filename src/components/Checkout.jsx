import { useState, useEffect } from 'react';
import { SectionWrapperAlt } from '../hoc';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { TiArrowSortedDown } from "react-icons/ti";
import * as Yup from 'yup';
import { arrowRight, shoppingGood } from '../assets';
import { clearCart  } from '../redux/cartSlice';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const OrderSuccessModal = ({ isVisible }) => {
    if (!isVisible) return null;

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
                className="bg-white md:p-12 ss:p-10 p-6 rounded-2xl 
                shadow-xl flex flex-col justify-center w-auto h-auto 
                items-center md:m-0 ss:m-16 m-6">
                    <div className='flex flex-col w-full items-center'>
                        <img src={shoppingGood} 
                            alt='orderSuccess'
                            className='w-[60px] h-auto md:mb-6 ss:mb-6 mb-5' 
                        />

                        <h1 className='font-semibold text-primary md:text-[27px]
                        ss:text-[23px] text-[20px] mb-2'>
                            Order Placed Successfully
                        </h1>

                        <p className='text-main md:text-[14px] ss:text-[14px] 
                        text-[12px] font-medium md:mb-8 ss:mb-8 mb-6 text-center
                        md:max-w-[400px] ss:max-w-[400px] max-w-[300px]
                        md:leading-[19px] ss:leading-[18px] leading-[17px]'>
                            Your order has been placed successfully! An 
                            email will be sent to you acknowledging this 
                            and we will then respond to you swiftly to 
                            discuss the next steps.
                        </p>

                        <p className='text-main3 md:text-[13px] ss:text-[13px] 
                        text-[11px] text-center'>
                            Redirecting back to <span className='text-secondary font-medium'>
                                Products</span>...
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.length;
    const totalAmount = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(',', '')) * item.quantity), 0);
    const vat = totalAmount * 0.075;
    const subtotal = totalAmount + vat;

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 900;
            setIsMobile(isMobile);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

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

    const handleWhatsAppOrder = () => {
        formik.validateForm().then((errors) => {

            if (Object.keys(errors).length > 0) {
                formik.setTouched({
                    state: true,
                    name: true,
                    email: true,
                    phone: true,
                });
                alert("Please complete all required form fields.");
                return;
            }
    
            if (!isCheckboxChecked) {
                alert("Please agree to the Privacy Policy and Terms of Usage.");
                return;
            }
        
            const cartItemsText = cartItems.map((item) => {
                return `Name: ${item.name} x ${item.quantity} \nType: ${item.type} \nManufacturer: ${item.manufacturer} \nVariations: ${item.variations} \nPrice- N${item.price.toLocaleString()}`;
            }).join("\n\n");
            
            
            const formDataText = `Name: ${formik.values.name}\nEmail: ${formik.values.email}\nPhone: ${formik.values.phone}\nState: ${formik.values.state}`;
            
            const orderSummaryText = `Items total: N${totalAmount.toLocaleString()}\nVAT (7.5%): N${vat.toLocaleString()}\nSubtotal: N${subtotal.toLocaleString()}`;
            
            // Combine all the data into a single message
            const message = `Order Details:\n\nBuyer Information:\n${formDataText}\n\nItems:\n${cartItemsText}\n\nOrder Summary:\n${orderSummaryText}`;
        
            const whatsappLink = `https://wa.me/2349014452743?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappLink, "_blank");

            setOrderSuccess(true);

            setTimeout(() => {
                dispatch(clearCart());
                setOrderSuccess(false);
                navigate('/products');
            }, 15000);
        });
    };


    return (
        <section className='relative w-full min-h-[60px] mx-auto flex
        items-center md:mb-14 md:px-0 ss:px-16 px-6 md:py-0 ss:py-0 py-3
        md:mb-0 ss:mb-12 mb-4'>
            <div className='max-w-[86rem] mx-auto flex flex-col md:gap-8
            ss:gap-8 gap-6 w-full'>

                {orderSuccess && (
                    <OrderSuccessModal
                        isVisible={orderSuccess}
                    />
                )}

                <h1 className='text-primary font-bold md:text-[22px]
                ss:text-[20px] text-[17px]'>
                    Checkout
                </h1>
                
                {cartItems.length === 0 ? (
                    <p className='text-primary font-medium text-[17px]'>
                        No items in cart
                    </p>
                ) : (
                    <div className='w-full flex md:flex-row flex-col 
                    justify-between md:gap-24 ss:gap-6 gap-5'>
                        {isMobile ? (
                        <div className='w-full flex md:flex-row flex-col 
                        justify-between md:gap-24 ss:gap-6 gap-5'>
                            <div className='md:w-1/4 ss:w-3/4 w-full'>
                                <div className='bg-main2 md:p-7 ss:p-7 p-4 
                                flex flex-col md:gap-3 ss:gap-3 gap-2 
                                md:rounded-xl ss:rounded-xl rounded-lg'>
                                    <h2 className='text-main font-bold 
                                    md:text-[18px] ss:text-[20px] text-[15px]'>
                                        Order Summary
                                    </h2>

                                    <div className='flex flex-col w-full
                                    md:gap-2 ss:gap-2 gap-1'>
                                        <div className='flex w-full justify-between
                                        items-center'>
                                            <p className='text-mainalt md:text-[16px]
                                            ss:text-[17px] text-[14px]'>
                                                Items total {`(${itemCount})`}:
                                            </p>

                                            <p className='text-main md:text-[18px] 
                                            ss:text-[18px] text-[15px] font-semibold'>
                                                <span className='line-through'>
                                                    N
                                                </span>
                                                {totalAmount.toLocaleString()}.00
                                            </p>
                                        </div>

                                        <div className='flex w-full justify-between
                                        items-center'>
                                            <p className='text-mainalt md:text-[16px]
                                            ss:text-[17px] text-[14px]'>
                                                VAT (7.5%)
                                            </p>

                                            <p className='text-main md:text-[18px] 
                                            ss:text-[18px] text-[15px] 
                                            font-semibold'>
                                                <span className='line-through'>
                                                    N
                                                </span>
                                                {vat.toLocaleString()}.00
                                            </p>
                                        </div>

                                        <div className='flex w-full justify-between
                                        items-center'>
                                            <p className='text-mainalt md:text-[16px]
                                            ss:text-[17px] text-[14px]'>
                                                Subtotal:
                                            </p>

                                            <p className='text-greenDeep md:text-[20px] 
                                            ss:text-[20px] text-[16px] 
                                            font-bold'>
                                                <span className='line-through'>
                                                    N
                                                </span>
                                                {subtotal.toLocaleString()}.00
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <p className='text-main3 md:text-[14px]
                                    ss:text-[14px] text-[11px] border-t-[1px] 
                                    border-primaryalt md:pt-4 ss:pt-4 pt-3 
                                    md:mt-2 ss:mt-2 mt-1 md:leading-0
                                    ss:leading-[20px] leading-[16px]'>
                                        This figure does not include any other 
                                        extra fees that may be incurred via 
                                        logistics, etc.
                                    </p>
                                </div>

                                <a href='/cart'
                                className='flex md:justify-end gap-2 md:mt-4
                                mt-5 cursor-pointer items-center'
                                >
                                    <p className='text-primary font-semibold
                                    md:text-[14px] ss:text-[14px] text-[12px]'>
                                        Go back to cart to review items
                                    </p>

                                    <img
                                        src={arrowRight}
                                        alt='arrow'
                                        className='w-4 h-4'
                                    />
                                </a>
                            </div>

                            <div className='flex flex-col md:w-3/5 ss:w-3/4 
                            w-full md:gap-6 ss:gap-6 gap-5'>
                                <div className='bg-main2 md:rounded-xl 
                                ss:rounded-xl rounded-lg md:p-5 ss:p-5 p-3 
                                flex gap-3 items-center'>
                                    <HiOutlineInformationCircle
                                        className='text-mainalt md:text-[30px]
                                        ss:text-[60px] text-[60px]'
                                    />

                                    <p className='text-mainalt md:text-[14px]
                                    ss:text-[14px] text-[12px] md:leading-[19px] 
                                    ss:leading-[19px] leading-[18px] font-medium'>
                                        Fill in the form to complete your 
                                        order for the selected product(s). 
                                        Confirm your orders, submit the form
                                        and we'll get back to you in 
                                        light's speed.
                                    </p>
                                </div>

                                <form onSubmit={formik.handleSubmit}
                                className='flex flex-col md:gap-5 ss:gap-4 
                                gap-3 w-full'>
                                    <div className="flex flex-col">
                                        <label className="text-main mb-2 
                                        md:text-[15px] font-semibold
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
                                                className="py-2.5 px-3 border-search 
                                                text-main3 md:rounded-lg rounded-md 
                                                cursor-pointer md:text-[13px]
                                                ss:text-[13px] text-[11px] 
                                                bg-transparent w-full custom-select"
                                            >
                                                <option value="" disabled hidden>Select your state of residence</option>
                                                <option value="FCT">FCT</option>
                                                <option value="Abia">Abia</option>
                                                <option value="Adamawa">Adamawa</option>
                                                <option value="Akwaibom">Akwa Ibom</option>
                                                <option value="Anambra">Anambra</option>
                                                <option value="Bauchi">Bauchi</option>
                                                <option value="Bayelsa">Bayelsa</option>
                                                <option value="Benue">Benue</option>
                                                <option value="Borno">Borno</option>
                                                <option value="Crossriver">Cross River</option>
                                                <option value="Delta">Delta</option>
                                                <option value="Ebonyi">Ebonyi</option>
                                                <option value="Edo">Edo</option>
                                                <option value="Ekiti">Ekiti</option>
                                                <option value="Enugu">Enugu</option>
                                                <option value="Gombe">Gombe</option>
                                                <option value="Imo">Imo</option>
                                                <option value="Jigawa">Jigawa</option>
                                                <option value="Kaduna">Kaduna</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Katsina">Katsina</option>
                                                <option value="Kebbi">Kebbi</option>
                                                <option value="Kogi">Kogi</option>
                                                <option value="Kwara">Kwara</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Nasarawa">Nasarawa</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Ogun">Ogun</option>
                                                <option value="Ondo">Ondo</option>
                                                <option value="Osun">Osun</option>
                                                <option value="Oyo">Oyo</option>
                                                <option value="Plateau">Plateau</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Sokoto">Sokoto</option>
                                                <option value="Taraba">Taraba</option>
                                                <option value="Yobe">Yobe</option>
                                                <option value="Zamfara">Zamfara</option>
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
                                        md:text-[15px] font-semibold
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
                                            className="py-2.5 px-3 border-search 
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
                                        md:text-[15px] font-semibold
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
                                            className="py-2.5 px-3 border-search 
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
                                        md:text-[15px] font-semibold
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
                                            className="py-2.5 px-3 border-search 
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

                                <div className='w-full flex flex-col md:gap-4 
                                ss:gap-4 gap-3'>
                                    <div className='flex items-center md:gap-2\
                                    ss:gap-2 gap-3'>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer'
                                            checked={isCheckboxChecked}
                                            onChange={handleCheckboxChange}
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

                                    <button className='bg-primary md:text-[14px] 
                                    ss:text-[14px] text-[12px] text-center 
                                    text-white rounded-lg grow2 cursor-pointer 
                                    md:w-[200px] ss:w-[200px] w-full py-3.5'>
                                        Place Order
                                    </button>

                                    <button className='bg-greenDeep md:text-[14px] 
                                    ss:text-[14px] text-[12px] text-center 
                                    text-white rounded-lg grow2 cursor-pointer 
                                    md:w-[200px] ss:w-[200px] w-full py-3.5'
                                    onClick={handleWhatsAppOrder}
                                    >
                                        Place via WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                        ) : (
                        <div className='w-full flex md:flex-row flex-col 
                        justify-between md:gap-24 ss:gap-6 gap-5'>
                            <div className='flex flex-col md:w-3/5 ss:w-3/4 
                            w-full md:gap-6 ss:gap-6 gap-5'>
                                <div className='bg-main2 md:rounded-xl 
                                ss:rounded-xl rounded-lg md:p-5 ss:p-5 p-3 
                                flex gap-3 items-center'>
                                    <HiOutlineInformationCircle
                                        className='text-mainalt md:text-[30px]
                                        ss:text-[60px] text-[60px]'
                                    />

                                    <p className='text-mainalt md:text-[14px]
                                    ss:text-[14px] text-[12px] md:leading-[19px] 
                                    ss:leading-[19px] leading-[18px] font-medium'>
                                        Fill in the form to complete your 
                                        order for the selected product(s). 
                                        Confirm your orders, submit the form
                                        and we'll get back to you in 
                                        light's speed.
                                    </p>
                                </div>

                                <form onSubmit={formik.handleSubmit}
                                className='flex flex-col md:gap-5 ss:gap-4 
                                gap-3 w-full'>
                                    <div className="flex flex-col">
                                        <label className="text-main mb-2 
                                        md:text-[15px] font-semibold
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
                                                className="py-2.5 px-3 border-search 
                                                text-main3 md:rounded-lg rounded-md 
                                                cursor-pointer md:text-[13px]
                                                ss:text-[13px] text-[11px] 
                                                bg-transparent w-full custom-select"
                                            >
                                                <option value="" disabled hidden>Select your state of residence</option>
                                                <option value="FCT">FCT</option>
                                                <option value="Abia">Abia</option>
                                                <option value="Adamawa">Adamawa</option>
                                                <option value="Akwaibom">Akwa Ibom</option>
                                                <option value="Anambra">Anambra</option>
                                                <option value="Bauchi">Bauchi</option>
                                                <option value="Bayelsa">Bayelsa</option>
                                                <option value="Benue">Benue</option>
                                                <option value="Borno">Borno</option>
                                                <option value="Crossriver">Cross River</option>
                                                <option value="Delta">Delta</option>
                                                <option value="Ebonyi">Ebonyi</option>
                                                <option value="Edo">Edo</option>
                                                <option value="Ekiti">Ekiti</option>
                                                <option value="Enugu">Enugu</option>
                                                <option value="Gombe">Gombe</option>
                                                <option value="Imo">Imo</option>
                                                <option value="Jigawa">Jigawa</option>
                                                <option value="Kaduna">Kaduna</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Katsina">Katsina</option>
                                                <option value="Kebbi">Kebbi</option>
                                                <option value="Kogi">Kogi</option>
                                                <option value="Kwara">Kwara</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Nasarawa">Nasarawa</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Ogun">Ogun</option>
                                                <option value="Ondo">Ondo</option>
                                                <option value="Osun">Osun</option>
                                                <option value="Oyo">Oyo</option>
                                                <option value="Plateau">Plateau</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Sokoto">Sokoto</option>
                                                <option value="Taraba">Taraba</option>
                                                <option value="Yobe">Yobe</option>
                                                <option value="Zamfara">Zamfara</option>
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
                                        md:text-[15px] font-semibold
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
                                            className="py-2.5 px-3 border-search 
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
                                        md:text-[15px] font-semibold
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
                                            className="py-2.5 px-3 border-search 
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
                                        md:text-[15px] font-semibold
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
                                            className="py-2.5 px-3 border-search 
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

                                <div className='w-full flex flex-col md:gap-4 
                                ss:gap-4 gap-3'>
                                    <div className='flex items-center md:gap-2\
                                    ss:gap-2 gap-3'>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer'
                                            checked={isCheckboxChecked}
                                            onChange={handleCheckboxChange}
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

                                    <button className='bg-primary md:text-[14px] 
                                    ss:text-[14px] text-[12px] text-center 
                                    text-white rounded-lg grow2 cursor-pointer 
                                    md:w-[200px] ss:w-[200px] w-full py-3.5'>
                                        Place Order
                                    </button>

                                    <button className='bg-greenDeep md:text-[14px] 
                                    ss:text-[14px] text-[12px] text-center 
                                    text-white rounded-lg grow2 cursor-pointer 
                                    md:w-[200px] ss:w-[200px] w-full py-3.5'
                                    onClick={handleWhatsAppOrder}
                                    >
                                        Place via WhatsApp
                                    </button>
                                </div>
                            </div>
                            
                            <div className='md:w-1/4 ss:w-3/4 w-full'>
                                <div className='bg-main2 md:p-7 ss:p-7 p-4 
                                flex flex-col md:gap-3 ss:gap-3 gap-2 
                                md:rounded-xl ss:rounded-xl rounded-lg'>
                                    <h2 className='text-main font-bold 
                                    md:text-[18px] ss:text-[20px] text-[15px]'>
                                        Order Summary
                                    </h2>

                                    <div className='flex flex-col w-full
                                    md:gap-2 ss:gap-2 gap-1'>
                                        <div className='flex w-full justify-between
                                        items-center'>
                                            <p className='text-mainalt md:text-[16px]
                                            ss:text-[17px] text-[14px]'>
                                                Items total {`(${itemCount})`}:
                                            </p>

                                            <p className='text-main md:text-[18px] 
                                            ss:text-[18px] text-[15px] font-semibold'>
                                                <span className='line-through'>
                                                    N
                                                </span>
                                                {totalAmount.toLocaleString()}.00
                                            </p>
                                        </div>

                                        <div className='flex w-full justify-between
                                        items-center'>
                                            <p className='text-mainalt md:text-[16px]
                                            ss:text-[17px] text-[14px]'>
                                                VAT (7.5%)
                                            </p>

                                            <p className='text-main md:text-[18px] 
                                            ss:text-[18px] text-[15px] 
                                            font-semibold'>
                                                <span className='line-through'>
                                                    N
                                                </span>
                                                {vat.toLocaleString()}.00
                                            </p>
                                        </div>

                                        <div className='flex w-full justify-between
                                        items-center'>
                                            <p className='text-mainalt md:text-[16px]
                                            ss:text-[17px] text-[14px]'>
                                                Subtotal:
                                            </p>

                                            <p className='text-greenDeep md:text-[20px] 
                                            ss:text-[20px] text-[16px] 
                                            font-bold'>
                                                <span className='line-through'>
                                                    N
                                                </span>
                                                {subtotal.toLocaleString()}.00
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <p className='text-main3 md:text-[14px]
                                    ss:text-[14px] text-[11px] border-t-[1px] 
                                    border-primaryalt md:pt-4 ss:pt-4 pt-3 
                                    md:mt-2 ss:mt-2 mt-1 md:leading-0
                                    ss:leading-[20px] leading-[16px]'>
                                        This figure does not include any other 
                                        extra fees that may be incurred via 
                                        logistics, etc.
                                    </p>
                                </div>

                                <a href='/cart'
                                className='flex md:justify-end gap-2 md:mt-4
                                mt-5 cursor-pointer items-center'
                                >
                                    <p className='text-primary font-semibold
                                    md:text-[14px] ss:text-[14px] text-[12px]'>
                                        Go back to cart to review items
                                    </p>

                                    <img
                                        src={arrowRight}
                                        alt='arrow'
                                        className='w-4 h-4'
                                    />
                                </a>
                            </div>
                        </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SectionWrapperAlt(Checkout, '');
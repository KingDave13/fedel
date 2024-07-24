import { SectionWrapperAlt } from '../hoc';
import { useSelector } from 'react-redux';
import { useFormik } from "formik";
import { TiArrowSortedDown } from "react-icons/ti";
import * as Yup from 'yup';
import { arrowRight } from '../assets';
import { HiOutlineInformationCircle } from 'react-icons/hi2';


const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.length;
    const totalAmount = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(',', '')) * item.quantity), 0);
    const vat = totalAmount * 0.075;
    const subtotal = totalAmount + vat;

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
        <section className='relative w-full min-h-[60px] mx-auto flex
        items-center md:mb-14 md:px-0 ss:px-16 px-6 md:py-0 ss:py-0 py-3'>
            <div className='max-w-[86rem] mx-auto flex flex-col md:gap-8
            ss:gap-8 gap-6 w-full'>
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
                    justify-between md:gap-24 ss:gap-20 gap-8'>
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
                            className='flex flex-col md:gap-5 ss:gap-5 
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
                                md:w-[200px] ss:w-[200px] w-full py-3.5'>
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
                                ss:leading-[20px] leading-[17px]'>
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
        </section>
    );
};

export default SectionWrapperAlt(Checkout, '');
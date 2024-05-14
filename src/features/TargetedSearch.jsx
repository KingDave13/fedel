import { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import { RiInformationFill } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { ImPlay } from "react-icons/im";
import { TiArrowSortedDown } from "react-icons/ti";
import * as Yup from 'yup';

const TargetedSearch = () => {

    const formRef = useRef();
    const [Loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('targetedSearch');

    const formik = useFormik({
        initialValues: {
            product: '',
            category: '',
            price: '',
            numbermail: '',
        },

        validationSchema: Yup.object({
            product: Yup.string().required('Product is required.'),
            category: Yup.string().required('Category is required.'),
            price: Yup.string().required('Price is required.'),
            numbermail: Yup.string().required('Phone Number or Email is required.'),
        }),

        // onSubmit: (values) => {
        //     setLoading(true);

        //     emailjs.send(
        //         'service_1zam733',
        //         'template_bjv8tlu',
        //         {
        //           from_name: `${values.firstname} ${values.lastname}`,
        //           to_name: 'Elite Press Journals',
        //           from_email: values.email,
        //           to_email: 'contact@epjournals.com',
        //           subject: values.subject,
        //           message: values.message,
        //         },
        //         'UE-RzuF3c_ndNJ-Zw'
        //       )
        //       .then(
        //         () => {
        //           setLoading(false);
        //           setModalOpen(true);
        //           disableScroll();
          
        //           setTimeout(() => {
        //             setModalOpen(false);
        //             enableScroll();
        //           }, 2000);
          
        //           formik.resetForm();
        //         },
                
        //         (error) => {
        //           setLoading(false);
        //           console.log(error);
        //         }
        //     );
        // },
    });

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

  return (
    <div className='items-center w-full flex flex-col'>
        <div className='flex flex-col bg-white md:p-8 ss:p-8 p-5 
        md:rounded-[20px] rounded-[12px] md:gap-3 ss:gap-3 gap-2 
        border-[1px] border-main3'>
            <h2 className='text-primary font-bold md:text-[22px]
            ss:text-[20px] text-[18px] tracking-tight  md:leading-[30px] 
            ss:leading-[25px] leading-[25px]'>
                Let us know exactly what you want
            </h2>

            <p className='text-main md:leading-[19px] ss:leading-[19px] 
            leading-[18px] md:text-[15px] ss:text-[15px] text-[13px]'>
                Is there a particular style, pattern or brand of tile you're 
                looking for? We can find it quickly and also mail you some 
                samples!
            </p>

            <div className='flex flex-row w-full md:mt-3 ss:mt-3 mt-2
            justify-center items-center'>
                <h2 className={`text-main md:text-[15px] ss:text-[14px] text-[13px]
                ${selectedTab === 'targetedSearch' 
                ? 'text-primary font-bold border-b-primary border-b-[3px]' : ''} 
                    md:pb-2 ss:pb-2 pb-1 text-center w-full cursor-pointer`} 
                    onClick={() => handleTabChange('targetedSearch')}
                >
                    Targeted Search
                </h2>

                <h2 className={`text-main md:text-[15px] ss:text-[14px] text-[13px]
                text-center
                    w-full cursor-pointer ${selectedTab === 'messageUs' 
                    ? 'text-primary font-bold border-b-primary border-b-[3px]' : ''}
                    md:pb-2 ss:pb-2 pb-1`} 
                    onClick={() => handleTabChange('messageUs')}
                >
                    Message Us
                </h2>
            </div>
            <form ref={formRef} onSubmit={formik.handleSubmit}
            className="flex flex-col md:gap-2.5 ss:gap-2.5 md:mt-4 ss:mt-4
            mt-3 gap-2">
                {selectedTab === 'targetedSearch' ? (
                    <>
                    <div className="relative">
                        <div className='relative flex items-center'>
                            <select
                                type="text"
                                name="product"
                                value={formik.values.product}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                ss:px-3 px-2 border-search 
                                text-main3 md:rounded-lg rounded-md 
                                cursor-pointer md:text-[14px]
                                ss:text-[14px] text-[12px] 
                                bg-transparent w-full custom-select"
                            >
                                <option value="" disabled selected hidden>Select a product</option>
                                <option value="social_media">Social Media</option>
                                <option value="from_friend">From a friend</option>
                                <option value="other">Other</option>
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
                            {formik.touched.product && formik.errors.product}
                        </p>
                    </div>

                    <div className="relative">
                        <div className='relative flex items-center'>
                            <select
                                type="text"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                ss:px-3 px-2 border-search 
                                text-main3 md:rounded-lg rounded-md 
                                cursor-pointer md:text-[14px]
                                ss:text-[14px] text-[12px] 
                                bg-transparent w-full custom-select"
                            >
                                <option value="" disabled selected hidden>Select a category</option>
                                <option value="social_media">Social Media</option>
                                <option value="from_friend">From a friend</option>
                                <option value="other">Other</option>
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
                            {formik.touched.category && formik.errors.category}
                        </p>
                    </div>

                    <div className="relative">
                        <div className='relative flex items-center'>
                            <select
                                type="text"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                                ss:px-3 px-2 border-search 
                                text-main3 md:rounded-lg rounded-md 
                                cursor-pointer md:text-[14px]
                                ss:text-[14px] text-[12px] 
                                bg-transparent w-full custom-select"
                            >
                                <option value="" disabled selected hidden>Select a price range</option>
                                <option value="social_media">Social Media</option>
                                <option value="from_friend">From a friend</option>
                                <option value="other">Other</option>
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
                            {formik.touched.price && formik.errors.price}
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="numbermail"
                            placeholder='Enter your phone number or email'
                            value={formik.values.numbermail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                            ss:px-3 px-2 border-search 
                            text-black md:rounded-lg rounded-md md:text-[14px]
                            ss:text-[14px] text-[12px]
                            bg-transparent w-full placeholder:text-main3"
                        />
                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                            {formik.touched.numbermail && formik.errors.numbermail}
                        </p>
                    </div>

                    <div className="w-full mt-1">
                        <button
                        type="submit"
                        className="bg-primary grow5 md:text-[15px] w-full
                        ss:text-[16px] text-[12px] md:py-3 ss:py-3 py-2.5 
                        text-white md:rounded-lg rounded-md border-none"
                        >
                            {Loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                            ss:px-3 px-2 border-search 
                            text-black md:rounded-lg rounded-md md:text-[14px]
                            ss:text-[14px] text-[12px]
                            bg-transparent w-full placeholder:text-main3"
                        />
                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                            {formik.touched.name && formik.errors.name}
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="email"
                            placeholder='Enter your email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                            ss:px-3 px-2 border-search 
                            text-black md:rounded-lg rounded-md md:text-[14px]
                            ss:text-[14px] text-[12px]
                            bg-transparent w-full placeholder:text-main3"
                        />
                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                            {formik.touched.email && formik.errors.email}
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="subject"
                            placeholder='Enter a subject (e.g. Inquiry for Glass Marble Tile)'
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                            ss:px-3 px-2 border-search 
                            text-black md:rounded-lg rounded-md md:text-[14px]
                            ss:text-[14px] text-[12px]
                            bg-transparent w-full placeholder:text-main3"
                        />
                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                            {formik.touched.subject && formik.errors.subject}
                        </p>
                    </div>

                    <div className="relative">
                        <textarea
                            rows="5"
                            name="message"
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your message"
                            className="md:py-2.5 ss:py-2 py-1.5 md:px-3 
                            ss:px-3 px-2 border-search 
                            text-black md:rounded-lg rounded-md md:text-[14px]
                            ss:text-[14px] text-[12px]
                            bg-transparent w-full placeholder:text-main3"
                        />
                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                            {formik.touched.message && formik.errors.message}
                        </p>
                    </div>

                    <div className='flex w-full flex-col gap-0.5'>
                        <div className='flex w-full gap-2 cursor-pointer'>
                            <GrAttachment />

                            <h4 className='text-main font-medium tracking-tight
                            md:text-[13px] ss:text-[13px] text-[12px]'>
                                Attach Images
                            </h4>
                        </div>

                        <h4 className='text-mainalt md:text-[12px] ss:text-[12px] 
                        text-[11px] tracking-tight'>
                            Only JPEG, JPG and PNG less than 2MB allowed
                        </h4>
                    </div>

                    <div className="flex gap-2 w-full mt-1">
                        <button
                        type="submit"
                        className="bg-primary grow5 md:text-[14px] w-full
                        ss:text-[14px] text-[11px] md:py-3 ss:py-3 py-2 
                        text-white md:rounded-lg rounded-md border-none"
                        >
                            {Loading ? 'Sending...' : 'Send Email'}
                        </button>

                        <button
                        type="submit"
                        className="bg-green grow5 md:text-[14px] w-full
                        ss:text-[14px] text-[11px] md:py-3 ss:py-3 py-2 
                        text-white md:rounded-lg rounded-md border-none"
                        >
                            {Loading ? 'Sending...' : 'Send via WhatsApp'}
                        </button>
                    </div>
                    </>
                )}

                <div className='flex w-full gap-3 md:mt-4 ss:mt-4 mt-3
                items-center'>
                    <RiInformationFill 
                        className='text-main3 ss:text-[57px]
                        text-[55px]'
                    />

                    <h3 className='text-main3 md:text-[13px] ss:text-[12px]
                    text-[11px] md:leading-[18px] ss:leading-[17px]
                    leading-[14px] tracking-tight'>
                        If you have any special requests or orders you may
                        want to place, do well to switch to the "Message
                        Us" tab to send an email or WhatsApp message 
                        directly.
                    </h3>
                </div>

                <div className='flex w-full gap-3 mt-1 items-center
                cursor-pointer grow5'>
                    <ImPlay className='text-secondary ss:text-[27px] 
                        md:ml-1 text-[27px]'
                    />
                    <h3 className='text-primary md:text-[13px] ss:text-[12px]
                    text-[11px] font-bold md:leading-[17px] ss:leading-[17px]
                    leading-[14px] tracking-tight'>
                        Click here to watch our help video if you want to
                        know how to use our website better.
                    </h3>
                </div>
            </form>
        </div>
    </div>
  )
};

export default TargetedSearch;
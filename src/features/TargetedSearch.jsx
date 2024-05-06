import { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import { RiInformationFill } from "react-icons/ri";
import { ImPlay } from "react-icons/im";
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
        rounded-[20px] md:gap-3 border-[1px] border-main3'>
            <h2 className='text-primary font-bold md:text-[22px]
            ss:text-[20px] text-[20px] tracking-tight'>
                Let us know exactly what you want
            </h2>

            <p className='text-main md:leading-[19px] ss:leading-[19px] 
            leading-[19px] md:text-[15px] ss:text-[15px] text-[14px]'>
                Is there a particular style, pattern or brand of tile you're 
                looking for? We can find it quickly and also mail you some 
                samples!
            </p>

            <div className='flex flex-row w-full md:mt-3 ss:mt-3 mt-2
            justify-center items-center'>
                <h2 className={`text-primary md:text-[15px] ${selectedTab === 'targetedSearch' 
                ? 'font-bold border-b-primary border-b-[3px]' : ''} 
                    md:pb-2 text-center w-full cursor-pointer`} 
                    onClick={() => handleTabChange('targetedSearch')}
                >
                    Targeted Search
                </h2>

                <h2 className={`text-main md:text-[15px] text-center
                    w-full cursor-pointer ${selectedTab === 'messageUs' 
                    ? 'font-bold border-b-primary border-b-[3px]' : ''}`} 
                    onClick={() => handleTabChange('messageUs')}
                >
                    Message Us
                </h2>
            </div>
            <form ref={formRef} onSubmit={formik.handleSubmit}
            className="flex flex-col md:gap-3 ss:gap-3 md:mt-4 ss:mt-4
            mt-3 gap-2">
                <div className="relative">
                    <select
                        type="text"
                        name="product"
                        value={formik.values.product}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="md:py-2.5 ss:py-2 py-2 md:px-3 border-search 
                        text-main3 rounded-lg cursor-pointer md:text-[14px] 
                        bg-transparent w-full"
                    >
                        <option value="" disabled selected hidden>Select a product</option>
                        <option value="social_media">Social Media</option>
                        <option value="from_friend">From a friend</option>
                        <option value="other">Other</option>
                    </select>
                    <p className="text-mainRed md:text-[12px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                        {formik.touched.product && formik.errors.product}
                    </p>
                </div>

                <div className="relative">
                    <select
                        type="text"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="md:py-2.5 ss:py-2 py-2 md:px-3 border-search 
                        text-main3 rounded-lg cursor-pointer md:text-[14px] 
                        bg-transparent w-full"
                    >
                        <option value="" disabled selected hidden>Select a category</option>
                        <option value="social_media">Social Media</option>
                        <option value="from_friend">From a friend</option>
                        <option value="other">Other</option>
                    </select>
                    <p className="text-mainRed md:text-[12px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                        {formik.touched.category && formik.errors.category}
                    </p>
                </div>

                <div className="relative">
                    <select
                        type="text"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="md:py-2.5 ss:py-2 py-2 md:px-3 border-search 
                        text-main3 rounded-lg cursor-pointer md:text-[14px] 
                        bg-transparent w-full"
                    >
                        <option value="" disabled selected hidden>Select a price range</option>
                        <option value="social_media">Social Media</option>
                        <option value="from_friend">From a friend</option>
                        <option value="other">Other</option>
                    </select>
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
                        className="md:py-2.5 ss:py-2 py-2 md:px-3 border-search 
                        text-black rounded-lg md:text-[14px] 
                        bg-transparent w-full placeholder:text-main3"
                   />
                    <p className="text-mainRed md:text-[12px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                        {formik.touched.numbermail && formik.errors.numbermail}
                    </p>
                </div>

                <div className="w-full md:mt-3 ss:mt-3 mt-2">
                    <button
                    type="submit"
                    className="bg-primary grow md:text-[15px] w-full
                    ss:text-[16px] text-[14px] md:py-3 ss:py-3 py-2 
                    text-white rounded-lg border-none"
                    >
                        {Loading ? 'Submitting...' : 'Search'}
                    </button>
                </div>

                <div className='flex w-full gap-3 md:mt-8 ss:mt-8 mt-6
                items-center'>
                    <RiInformationFill 
                        className='text-main3 ss:text-[57px]
                        text-[27px]'
                    />

                    <h3 className='text-main3 md:text-[13px] ss:text-[12px]
                    text-[11px] md:leading-[18px] ss:leading-[17px]
                    leading-[15px] tracking-tight'>
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
                    leading-[15px] tracking-tight'>
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
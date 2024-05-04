import { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import * as Yup from 'yup';

const TargetedSearch = () => {

    const formRef = useRef();
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            subject: '',
            message: '',
        },

        validationSchema: Yup.object({
            firstname: Yup.string().required('First Name is required.'),
            lastname: Yup.string().required('Last Name is required.'),
            email: Yup.string().email('Invalid email address.').required('Email is required.'),
            subject: Yup.string().required('Subject is required.'),
            message: Yup.string().required('Message is required.'),
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

  return (
    <div className='items-center w-full flex flex-col'>
        <div className='flex flex-col bg-white md:p-8 ss:p-8 p-5 
        rounded-[20px] md:gap-3'>
            <h2 className='text-primary font-bold md:text-[20px]
            ss:text-[20px] text-[20px] tracking-tight'>
                Let us know exactly what you want
            </h2>

            <p className='text-main md:leading-[20px] ss:leading-[19px] 
            leading-[19px] md:text-[15px] ss:text-[15px] text-[14px]'>
                Is there a particular style, pattern or brand of tile you're 
                looking for? We can find it quickly and also mail you some 
                samples!
            </p>

            <div className='flex flex-row w-full md:mt-3 ss:mt-3 mt-2'>
                <h2 className='font-bold text-primary md:text-[15px]'>
                    Targeted Search
                </h2>
            </div>
            <form ref={formRef} onSubmit={formik.handleSubmit}
            className="flex flex-col md:gap-3 ss:gap-3 md:mt-5 ss:mt-5
            mt-3 gap-2">
                <div className="flex flex-col">
                    <select
                    type="text"
                    name="product"
                    value={formik.values.mode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Select a product"
                    className="md:py-3 ss:py-2 py-2 px-4 border-main 
                    text-main md:rounded-[3px]
                    ss:rounded-[3px] rounded-[3px] cursor-pointer
                    md:placeholder:text-[14px] 
                    ss:placeholder:text-[12px] 
                    placeholder:text-[12px] bg-transparent"
                    >
                        <option>Select a product</option>
                        <option>Social Media</option>
                        <option>From a friend</option>
                        <option>Other</option>
                    </select>
                    <p className="text-mainRed md:text-[12px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                    >
                        {formik.touched.mode && formik.errors.mode}
                    </p>
                </div>

                <div className="col-span-2 flex flex-col">
                    <label className="text-main md:mb-3 ss:mb-2 mb-2 
                    md:text-[18px] ss:text-[16px] text-[14px] font-bold">
                        Email Address
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email address"
                    className="md:py-3 ss:py-3 py-2 px-4 border-none 
                    outline-none text-maintext md:rounded-[5px]
                    ss:rounded-[5px] rounded-[5px]
                    md:placeholder:text-[15px] font-medium
                    ss:placeholder:text-[13px] 
                    placeholder:text-[12px] bg-primaryalt"
                    />
                    <p className="text-mainRed md:text-[13px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                    >
                        {formik.touched.email && formik.errors.email}
                    </p>
                </div>

                <div className="col-span-2 flex flex-col">
                    <label className="text-main md:mb-3 ss:mb-2 mb-2 
                    md:text-[18px] ss:text-[16px] text-[14px] font-bold">
                        Subject
                    </label>
                    <input
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter a subject"
                    className="md:py-3 ss:py-3 py-2 px-4 border-none 
                    outline-none text-maintext md:rounded-[5px]
                    ss:rounded-[5px] rounded-[5px]
                    md:placeholder:text-[15px] font-medium
                    ss:placeholder:text-[13px] 
                    placeholder:text-[12px] bg-primaryalt"
                    />
                    <p className="text-mainRed md:text-[13px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                    >
                        {formik.touched.subject && formik.errors.subject}
                    </p>
                </div>

                <div className="col-span-2 flex flex-col">
                    <label className="text-main md:mb-3 ss:mb-2 mb-2 
                    md:text-[18px] ss:text-[16px] text-[14px] font-bold">
                        Message
                    </label>
                    <textarea
                    rows="6"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="How may we assist you?"
                    className="md:py-3 ss:py-3 py-2 px-4 border-none 
                    outline-none text-maintext md:rounded-[5px]
                    ss:rounded-[5px] rounded-[5px]
                    md:placeholder:text-[15px] font-medium
                    ss:placeholder:text-[13px] 
                    placeholder:text-[12px] bg-primaryalt"
                    />
                    <p className="text-mainRed md:text-[13px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                    >
                        {formik.touched.message ? formik.errors.message : ''}
                    </p>
                </div>

                <div className="col-span-2 md:mt-0 ss:mt-0 mt-5">
                    <button
                    type="submit"
                    className="bg-main grow md:text-[16px] 
                    ss:text-[16px] text-[14px] md:py-3 ss:py-3 py-2 
                    md:px-20 ss:px-14 px-10 text-white rounded-lg
                    font-medium border-none"
                    >
                        {Loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
};

export default TargetedSearch;
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
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
    <section className="md:min-h-[1000px] ss:min-h-[920px] min-h-[880px] 
    flex items-center">
        <div className='items-center w-full flex flex-col'>
            {modalOpen && (
                <Modal />
            )}

            <motion.div variants={textVariant()} className='w-full'>
                <div className="w-full flex justify-center items-center">
                    <p className='text-main font-medium md:text-[20px] ss:text-[20px] 
                    text-[15px]'>
                        <span className='font-bold'>EMAIL: </span> 
                        <a href='mailto:contact@epjournals.com' 
                        className='hover:text-secondary'>
                            contact@epjournals.com
                        </a>
                    </p>
                </div>
            </motion.div>

            <motion.div variants={fadeIn('down', 'spring', 0.3)}
            className='w-full md:mt-10 ss:mt-8 mt-6'>
                <div className='bg-main2 md:p-12 ss:p-8 p-5 rounded-xl'>
                <form ref={formRef} onSubmit={formik.handleSubmit}
                className="grid grid-cols-2 md:gap-6 ss:gap-6 gap-4">
                    <div className="flex flex-col">
                        <label className="text-main md:mb-3 ss:mb-2 mb-2 
                        md:text-[18px] ss:text-[16px] text-[14px] font-bold">
                            First Name
                        </label>
                        <input
                        type="text"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your first name"
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
                            {formik.touched.firstname && formik.errors.firstname}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-main md:mb-3 ss:mb-2 mb-2 
                        md:text-[18px] ss:text-[16px] text-[14px] font-bold">
                            Last Name
                        </label>
                        <input
                        type="text"
                        name="lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your last name"
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
                            {formik.touched.lastname && formik.errors.lastname}
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
            </motion.div>
        </div>
    </section>
  )
};

export default TargetedSearch;
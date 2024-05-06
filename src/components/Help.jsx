import { SectionWrapper } from "../hoc";
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useNavigate } from 'react-router-dom';
import { helpImg } from '../assets';
import { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import { GrAttachment } from "react-icons/gr";
import * as Yup from 'yup';

const Help = () => {
    const navigate = useNavigate();

    const formRef = useRef();
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            subject: '',
            message: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Name is required.'),
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
        <section className="w-full md:min-h-[550px] ss:min-h-[550px] 
        min-h-[900px] flex items-center">
            <div className='relative items-center w-full max-w-[86rem]'>
            <motion.div variants={fadeIn('down', 'spring', 0.3)}
                className="flex md:flex-row ss:flex-row flex-col md:gap-20 
                ss:gap-10 gap-12 w-full">
                    <motion.div variants={textVariant()}
                    className={`${layout.sectionInfo} md:gap-8 ss:gap-8
                    gap-6`}>
                        <h1 className="text-primary font-bold md:text-[45px]
                        ss:text-[45px] text-[33px] md:leading-[52px] 
                        ss:leading-[52px] leading-[40px] tracking-tight">
                            Still need help?
                        </h1>

                        <p className='text-main md:text-[19px] ss:text-[17px] 
                        text-[14px] md:max-w-[700px] ss:max-w-[400px]  
                        md:leading-[28px] font-medium tracking-tight'>
                            Is there still something we haven't made 
                            clear or you're still not sure about us 
                            concerning our products, services or 
                            delivery? Reach out to us and we'll get back 
                            to you in light's speed.
                        </p>

                        <form ref={formRef} onSubmit={formik.handleSubmit}
                        className="flex flex-col md:gap-2.5 ss:gap-2.5 md:mt-4 ss:mt-4
                        mt-3 gap-2">

                        </form>
                    </motion.div>

                    <motion.div variants={fadeIn('left', 'spring', 0.3)}
                    className="flex-1 w-full">
                        <img src={helpImg} 
                            alt='Help Image'
                            className='md:h-full ss:h-full h-[200px] w-full
                            rounded-3xl'
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SectionWrapper(Help, '');
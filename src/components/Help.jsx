import { SectionWrapper } from "../hoc";
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { helpImg } from '../assets';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from "formik";
import { GrAttachment } from "react-icons/gr";
import * as Yup from 'yup';

const Help = () => {
    const formRef = useRef();
    const [Loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Send via WhatsApp');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

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
        onSubmit: (values) => {
            setLoading(true);

            const message = `Name: ${values.name}\nSubject: ${values.subject}\nMessage: ${values.message}`;
            const whatsappLink = `https://wa.me/2349169861311?text=${encodeURIComponent(message)}`;

            // If there are files, handle the upload
            if (files.length > 0) {
                const formData = new FormData();
                files.forEach(file => formData.append('files', file));

                // Add code here to upload files if needed
                console.log('Files:', files);
            }

            window.open(whatsappLink, "_blank");

            setButtonText('Sent Message');
            setLoading(false);

            setTimeout(() => {
                formik.resetForm();
                setFiles([]);
                setButtonText('Send via WhatsApp');
            }, 3000);
        },
    });

    const handleEmailSend = async () => {
        const errors = await formik.validateForm();

        if (Object.keys(errors).length > 0) {
            formik.setTouched({
                name: true,
                subject: true,
                message: true,
            });
            alert("Please complete all required form fields.");
            return;
        }
      
        const formDataText = `Name: ${formik.values.name}\nSubject: ${formik.values.subject}\nMessage: ${formik.values.message}`;
      
        // Prepare email data to send to server
        const emailData = {
            name:formik.values.name,
            subject: formik.values.subject,
            body: formDataText.replace(/\n/g, '<br>'), // Convert line breaks to HTML for the email body
            attachments: files,
        };
      
        // Send email data to server
        try {
            const formData = new FormData();
            formData.append('emailData', JSON.stringify(emailData));
            files.forEach((file) => {
                formData.append('attachments', file);
            });
        
            const response = await fetch('http://localhost:3002/send-help-email', {
                method: 'POST',
                body: formData,
            });
        
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the email');
        }
        formik.resetForm();        
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file =>
            (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024 // 2MB
        );
    
        if (validFiles.length !== selectedFiles.length) {
            alert('Some files are invalid. Only JPEG, JPG, and PNG files less than 2MB are allowed.');
        }
    
        // Generate previews
        const filePreviews = validFiles.map(file => URL.createObjectURL(file));
        setFiles(validFiles);
        setPreviews(filePreviews);
    };

    useEffect(() => {
        // Cleanup function to revoke object URLs
        return () => {
            previews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [previews]);

    return (
        <section className="w-full md:min-h-[550px] ss:min-h-[600px] 
        min-h-[850px] flex items-center">
            <div className='relative items-center w-full max-w-[86rem]'>
            <motion.div variants={fadeIn('down', 'spring', 0.3)}
                className="flex md:flex-row flex-col md:gap-20 
                ss:gap-16 gap-12 md:w-1/2 w-full">
                    <motion.div variants={textVariant()}
                    className={`${layout.sectionInfo} md:gap-6 ss:gap-4
                    gap-4`}>
                        <h1 className="text-primary font-bold md:text-[35px]
                        ss:text-[35px] text-[30px] tracking-tight">
                            Still need help?
                        </h1>

                        <p className='text-main md:text-[16px] ss:text-[17px] 
                        text-[14px] md:max-w-[550px] md:leading-[23px] 
                        ss:leading-[25px] leading-[20px] font-medium 
                        tracking-tight'>
                            Is there still something we haven't made 
                            clear or you're still not sure about us 
                            concerning our products, services or 
                            delivery? Reach out to us and we'll get back 
                            to you in light's speed.
                        </p>

                        <form ref={formRef} onSubmit={formik.handleSubmit}
                        className="flex flex-col md:gap-2 ss:gap-2.5 
                        md:mt-4 ss:mt-4 mt-3 gap-2 md:w-3/5 ss:w-2/3 w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Enter your name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="py-3 px-3 border-search 
                                    text-black rounded-lg md:text-[14px]
                                    ss:text-[14px] text-[13px]
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
                                    name="subject"
                                    placeholder='Enter a subject (e.g. Inquiry for Glass Marble Tile)'
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="py-3 px-3 border-search 
                                    text-black rounded-lg md:text-[14px]
                                    ss:text-[14px] text-[13px]
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
                                    className="py-3 px-3 border-search 
                                    text-black rounded-lg md:text-[14px]
                                    ss:text-[14px] text-[13px]
                                    bg-transparent w-full placeholder:text-main3"
                                />
                                <p className="text-mainRed md:text-[12px] 
                                ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                                    {formik.touched.message && formik.errors.message}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <div>
                                    <label className='inline-flex gap-2 cursor-pointer items-center'>
                                        <GrAttachment />
                                        <input
                                            type="file"
                                            multiple
                                            accept=".jpeg,.jpg,.png"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="fileInput"
                                        />
                                        <span className='text-main font-medium tracking-tight 
                                        md:text-[14px] ss:text-[14px] text-[13px]'>
                                            Attach Images
                                        </span>
                                    </label>

                                    <h4 className='text-mainalt md:text-[13px] ss:text-[13px] 
                                    text-[12px] tracking-tight'>
                                        Only JPEG, JPG and PNG less than 2MB allowed
                                    </h4>

                                    <div className='mt-3 flex gap-3'>
                                        {previews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                className='w-10 h-auto object-cover rounded-md'
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:gap-2 ss:gap-2.5 gap-2 
                            md:mt-1 ss:mt-1 mt-2">
                                <button
                                type="button"
                                className="bg-primary grow5 md:text-[13px] px-3
                                ss:text-[14px] text-[12px] py-3 
                                text-white rounded-lg border-none"
                                onClick={handleEmailSend}
                                >
                                    {Loading ? 'Sending...' : 'Send Email'}
                                </button>

                                <button
                                type="submit"
                                className="bg-green grow5 md:text-[13px] px-3
                                ss:text-[14px] text-[12px] py-3
                                text-white rounded-lg border-none"
                                >
                                    {Loading ? 'Sending...' : buttonText}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    <motion.div variants={fadeIn('down', 'spring', 0.3)}
                    className="flex-1 w-full md:hidden flex">
                        <img src={helpImg} 
                            alt='Help'
                            className='md:h-full ss:h-[300px] h-[200px] w-full
                            rounded-[15px]'
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SectionWrapper(Help, '');
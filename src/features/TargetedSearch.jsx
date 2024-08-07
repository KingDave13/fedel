import { useState, useRef, useEffect } from 'react';
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
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

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

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

  return (
    <div className='items-center w-full flex flex-col'>
        <div className='flex flex-col bg-white md:p-8 ss:p-8 p-5 
        md:rounded-[20px] ss:rounded-[20px] rounded-[12px] md:gap-3 
        ss:gap-3 gap-2 border-[1px] border-main3'>
            <h2 className='text-primary font-bold md:text-[22px]
            ss:text-[22px] text-[18px] tracking-tight md:leading-[30px] 
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
                <h2 className={`text-main md:text-[15px] ss:text-[15px] text-[13px]
                ${selectedTab === 'targetedSearch' 
                ? 'text-primary font-bold border-b-primary border-b-[3px]' : ''} 
                    md:pb-2 ss:pb-2 pb-1 text-center w-full cursor-pointer
                    hover:text-primary`} 
                    onClick={() => handleTabChange('targetedSearch')}
                >
                    Targeted Search
                </h2>

                <h2 className={`text-main md:text-[15px] ss:text-[15px] text-[13px]
                text-center hover:text-primary
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
                                <option value="" disabled hidden>Select a product</option>
                                <option value="Tiles">Tiles</option>
                                <option value="Marble">Marble</option>
                                <option value="Granite">Granite</option>
                                <option value="MarbleSlab">Marble Slab</option>
                                <option value="GraniteSlab">Granite Slab</option>
                                <option value="Sanitary">Sanitary Wares</option>
                                <option value="FloorWall">Floor and Wall Materials</option>
                                <option value="Doors">Doors</option>
                                <option value="Installation">Installation Services</option>
                                <option value="Consultation">Consultation (Ask Questions)</option>
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
                                <option value="" disabled hidden>Select a category</option>
                                {/* <option value="social_media">Social Media</option>
                                <option value="from_friend">From a friend</option>
                                <option value="other">Other</option> */}
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
                                <option value="" disabled hidden>Select a price range</option>
                                <option value="0-10">0-10,000</option>
                                <option value="10,000-20,000">10,000-20,000</option>
                                <option value="20,000-50,000">20,000-50,000</option>
                                <option value="50,000-100,000">50,000-100,000</option>
                                <option value="100,000-500,000">100,000-500,000</option>
                                <option value="500,000-1,000,000">500,000-1,000,000</option>
                                <option value="1,000,000-5,000,000">1,000,000-5,000,000</option>
                            </select>
                            <div className='absolute md:right-3 
                            ss:right-3 right-2'>
                                <TiArrowSortedDown 
                                    className='text-main md:text-[18px]
                                    ss:text-[18px] text-[16px]'
                                />
                            </div>
                        </div>
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

                    <div className='flex flex-col w-full gap-0.5'>
                        <label className='inline-flex gap-2 cursor-pointer'>
                            <GrAttachment />
                            <input
                                type="file"
                                multiple
                                accept=".jpeg,.jpg,.png"
                                onChange={handleFileChange}
                                className="hidden"
                                id="fileInput"
                            />
                            <span className='text-main font-medium tracking-tight md:text-[13px] ss:text-[13px] text-[12px]'>
                                Attach Images
                            </span>
                        </label>

                        <h4 className='text-mainalt md:text-[12px] ss:text-[12px] 
                        text-[11px] tracking-tight'>
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
                        className='text-main3 ss:text-[40px]
                        text-[55px]'
                    />

                    <h3 className='text-main3 md:text-[13px] ss:text-[13px]
                    text-[11px] md:leading-[18px] ss:leading-[18px]
                    leading-[14px] tracking-tight'>
                        If you have any special requests or orders you may
                        want to place, do well to switch to the "Message
                        Us" tab to send an email or WhatsApp message 
                        directly.
                    </h3>
                </div>

                <div className='flex w-full gap-3 mt-1 items-center
                cursor-pointer grow5'>
                    <ImPlay className='text-secondary ss:text-[25px] 
                        md:ml-1 text-[27px]'
                    />
                    <h3 className='text-primary md:text-[13px] ss:text-[13px]
                    text-[11px] font-bold md:leading-[17px] ss:leading-[17px]
                    leading-[14px] tracking-tight'>
                        Click here to watch our help video if you want to
                        know how to use our website better.
                    </h3>
                </div>
            </form>
        </div>
    </div>
  );
};

export default TargetedSearch;
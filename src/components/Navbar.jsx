import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsX } from 'react-icons/bs';
import styles from '../styles';
import { HiOutlineChat, HiX } from 'react-icons/hi';
import { navLinks } from '../constants';
import { google, logo } from '../assets';
import { TiArrowSortedDown } from "react-icons/ti";
import { RiWhatsappLine } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { IoCartOutline, IoSearchOutline, IoMenu } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { client } from '../sanity';
import { useNavigate, useParams } from 'react-router-dom';


const QuoteModal = ({ onClose }) => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const closeQuoteModal = () => {
        onClose();
        document.body.style.overflow = 'auto';
        document.body.style.top = '0';
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required.'),
            email: Yup.string().email('Invalid email address.').required('Email is required.'),
            subject: Yup.string().required('Subject is required.'),
            message: Yup.string().required('Message is required.'),
        }),
        onSubmit: (values) => {

        },
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

    const handleWhatsAppSend = () => {
        formik.validateForm().then((errors) => {
            if (Object.keys(errors).length > 0) {
                formik.setTouched({
                    name: true,
                    email: true,
                    subject: true,
                    message: true,
                });
                alert("Please complete all required form fields.");
                return;
            }

            const formDataText = `Name: ${formik.values.name}\nEmail: ${formik.values.email}\nSubject: ${formik.values.subject}\nMessage: ${formik.values.message}`;
            const whatsappLink = `https://wa.me/2349014452743?text=${encodeURIComponent(formDataText)}`;
            window.open(whatsappLink, "_blank");
        });
        formik.resetForm();
    };
    
    const handleEmailSend = async () => {
        const errors = await formik.validateForm();

        if (Object.keys(errors).length > 0) {
            formik.setTouched({
                name: true,
                email: true,
                subject: true,
                message: true,
            });
            alert("Please complete all required form fields.");
            return;
        }
        
        const formDataText = `Name: ${formik.values.name}\nEmail: ${formik.values.email}\nSubject: ${formik.values.subject}\nMessage: ${formik.values.message}`;
        
        // Prepare email data to send to server
        const emailData = {
            name:formik.values.name,
            from: formik.values.email,
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
        
            const response = await fetch('https://fedel-server.vercel.app/get-quote-email', {
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

    return (
        <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-50 z-50">
                <motion.div 
                initial={{ y: 0, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-white md:p-8 ss:p-8 p-4 padphone rounded-2xl 
                shadow-xl flex flex-col md:justify-center ss:justify-center 
                w-auto md:h-auto ss:h-auto h-[80%] overflow-auto 
                items-center relative md:m-0 ss:m-16 m-6">
                    <button
                        className='absolute md:top-8 ss:top-8 top-4 
                        md:right-8 ss:right-8 right-4 text-main 
                        md:text-[20px] ss:text-[20px] text-[18px] 
                        cursor-pointer phone2'
                        onClick={closeQuoteModal}
                    >
                        <HiX />
                    </button>

                    <div className='flex flex-col w-full md:gap-8
                    ss:gap-8 gap-5'>
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
                                text-black md:rounded-lg rounded-md md:text-[13px]
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
                                text-black md:rounded-lg rounded-md md:text-[13px]
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
                                text-black md:rounded-lg rounded-md md:text-[13px]
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
                                text-black md:rounded-lg rounded-md md:text-[13px]
                                ss:text-[14px] text-[12px]
                                bg-transparent w-full placeholder:text-main3"
                            />
                            <p className="text-mainRed md:text-[12px] 
                            ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1">
                                {formik.touched.message && formik.errors.message}
                            </p>
                        </div>

                        <div className='flex flex-col gap-0.5'>
                            <div>
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
                                    <span className='text-main font-medium tracking-tight md:text-[12px] ss:text-[13px] text-[12px]'>
                                        Attach Images
                                    </span>
                                </label>

                                <h4 className='text-mainalt md:text-[12px] ss:text-[12px] 
                                text-[11px] tracking-tight'>
                                    Only JPEG, JPG and PNG less than 2MB allowed
                                </h4>

                                <div className='mt-1 flex gap-3'>
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

                        <div className="flex gap-2 w-full mt-1">
                            <button
                            type="button"
                            className="bg-primary grow5 md:text-[13px] w-full
                            ss:text-[14px] text-[11px] md:py-3 ss:py-3 py-2 
                            text-white md:rounded-lg rounded-md border-none"
                            onClick={handleEmailSend}
                            >
                               Send Email
                            </button>

                            <button
                            type="button"
                            className="bg-green grow5 md:text-[13px] w-full
                            ss:text-[14px] text-[11px] md:py-3 ss:py-3 py-2 
                            text-white md:rounded-lg rounded-md border-none"
                            onClick={handleWhatsAppSend}
                            >
                                Send via WhatsApp
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const menuRef = useRef(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.length;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    const { slug, categorySlug } = useParams();
    const currentCategory = slug || categorySlug || '';

    useEffect(() => {
        if (searchTerm) {
            const query = `*[_type == "product" && (category->slug.current == "${currentCategory}" || "${currentCategory}" == "") && name match "${searchTerm}*"] {
                name,
                slug,
                "categorySlug": category->slug.current
            }`;

            const fetchSuggestions = async () => {
                const results = await client.fetch(query);
                setSuggestions(results);
                setIsDropdownOpen(true);
            };

            fetchSuggestions();
        } else {
            setSuggestions([]);
            setIsDropdownOpen(false);
        }
    }, [searchTerm, currentCategory]);

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleSuggestionClick = (categorySlug, productSlug) => {
        if (categorySlug && productSlug) {
            navigate(`/products/${categorySlug.current || categorySlug}/${productSlug.current || productSlug}`);
            setSearchTerm('');
            setIsDropdownOpen(false);
        } else {
            console.error('Invalid categorySlug or productSlug');
        }
    };

    const handleQuoteModalOpen = () => {
        setIsQuoteModalOpen(true);
        setScrollPosition(window.pageYOffset);
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const toggleMenu = (id) => {
        setOpenMenuId((prevId) => (prevId === id ? null : id));
    };

    const disableScroll = () => {
        setScrollPosition(window.pageYOffset);
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    };

    const enableScroll = () => {
        document.body.style.overflow = 'auto';
        document.body.style.top = '0';
    };

    useEffect(() => {
        if (!toggle) {
          enableScroll();
        }
    }, [toggle]);      

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
        if (window.google && window.google.translate && window.google.translate.TranslateElement) {
            new window.google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
            );
            clearInterval(intervalId);
        }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

  return (
    <nav className='w-full flex items-center fixed top-0 z-20 navsmooth'>
        <div className='flex flex-col w-full items-center'>
            <div className={`w-full bg-main2 ${styles.paddingX}
            hidden md:flex`}>
                <div className='w-full flex justify-between items-center 
                max-w-[72rem] mx-auto md:py-2 ss:py-3 py-3'>
                    <div className="flex items-center w-full">
                        <ul className="list-none flex flex-row gap-6">
                            {navLinks.map((link, index) => (
                            <li
                                key={link.id}
                                className='text-decoration-none cursor-pointer 
                                py-2 flex flex-row gap-1 items-center relative'
                                onMouseEnter={() => toggleMenu(link.id)}
                                onMouseLeave={() => toggleMenu(null)}
                            >
                                <h3 className='text-main text-[13px] font-medium'>
                                    {link.title}
                                </h3>
                                
                                <TiArrowSortedDown 
                                    className='text-main text-[15px]'
                                />

                                {openMenuId === link.id && (
                                    <div className={`absolute top-full ${index === 0 ? 
                                    'left-0 transform-none' 
                                    : 'left-1/2 transform -translate-x-1/2'} 
                                    fade-in border-[1px] border-main2 z-10`}>
                                        <div className="bg-white shadow-xl p-6
                                        flex flex-col gap-1.5 z-20"
                                        style={{whiteSpace: 'nowrap'}}
                                        >
                                            {link.links.map((subLink, index) => (
                                                <a
                                                    key={index}
                                                    href={subLink.route}
                                                    className="flex text-[13px] text-main
                                                    hover:font-medium"
                                                >
                                                    {subLink.name}
                                                </a>
                                            ))}
                                        </div>
                                        <div className={`absolute top-0 ${index === 0 
                                        ? 'left-[15%] z-[-10]' 
                                        : 'left-1/2 z-[-10]'} 
                                        transform -translate-x-1/2 w-10 h-10
                                        bg-white rotate-45 border-[1px] border-main2`}>
                                        </div>
                                    </div>
                                )}
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex justify-center gap-6 flex-row
                    items-center'
                    >
                        <div className='flex justify-center gap-5 flex-row
                        items-center'>
                            <PiLineVerticalThin className='text-main text-[25px]'/>

                            <HiOutlineChat
                                className='text-main text-[18px] grow4 cursor-pointer'
                            />

                            <a href='mailto:fedeltileslimited@gmail.com'>
                                <FiMail 
                                    className='text-main text-[18px] grow4 cursor-pointer'
                                />
                            </a>
                            
                            <a href='https://wa.me/2349169861311' 
                            target='_blank' rel="noreferrer">
                                <RiWhatsappLine 
                                    className='text-main text-[18px] grow4 cursor-pointer'
                                />
                            </a>
                        </div>
                        
                        <div className='relative'>
                            <div id="google_translate_element" />

                            <div className='absolute right-10 bottom-0
                            flex gap-2 items-center'>
                                <img
                                    src={google}
                                    alt='google'
                                    className='w-8'
                                />
                                <p className='font-semibold text-brightRed
                                text-[11px]'>
                                    Translate
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-full flex bg-white ${styles.paddingX}`}>
                <div className='w-full flex justify-between items-center 
                max-w-[72rem] mx-auto py-3'>
                    <a href='/'>
                        <img
                            src={logo} alt='logo'
                            className='w-[100px] h-auto cursor-pointer'
                        />
                    </a>

                    <div className="hidden md:flex items-center w-full
                    gap-10 ml-12">
                        <div className='flex w-full justify-center relative'>
                            <div className='flex flex-row bg-main2 w-full
                            rounded-[10px] border-[1px] border-primaryalt 
                            py-1.5 px-2 gap-3 justify-between items-center'>
                                <IoSearchOutline
                                    className='text-main text-[20px]'
                                />

                                <input
                                    type='search'
                                    placeholder={currentCategory ? `Search ${currentCategory}` : 'Search for products'}
                                    className='w-full text-black text-[13px]
                                    placeholder:text-mainalt outline-none
                                    border-none bg-transparent'
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          const anchor = document.createElement('a');
                                          anchor.href = `/search?query=${searchTerm}`;
                                          anchor.click();
                                        }
                                    }}
                                    autoFocus
                                />

                                <a href={`/search?query=${searchTerm}`} 
                                className='bg-primary text-[12px] 
                                py-1.5 px-5 text-white rounded-[5px] grow4 
                                cursor-pointer justify-end'
                                >
                                    Search
                                </a>

                                {isDropdownOpen && suggestions.length > 0 && (
                                    <div className='absolute top-full mt-1 
                                    bg-white shadow-lg left-0 right-0 p-3
                                    rounded-md max-h-60 overflow-y-auto'>
                                        {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className='p-2 hover:bg-main2 font-medium
                                            cursor-pointer text-main text-[13px]'
                                            onClick={() => handleSuggestionClick(suggestion.categorySlug, suggestion.slug)}
                                        >
                                            {suggestion.name}
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex gap-10 items-center'>
                            <div className='flex justify-center items-center
                            relative'>
                                <a href='/cart'>
                                    <IoCartOutline
                                        className='text-primary text-[30px] grow4 
                                        cursor-pointer'
                                    />
                                    {itemCount > 0 && (
                                        <span className='absolute top-0 
                                        right-0 bg-greenDeep text-white 
                                        rounded-full text-[11px] w-[18px] h-[18px] 
                                        flex items-center justify-center'>
                                            {itemCount}
                                        </span>
                                    )}
                                </a>
                            </div>

                            <button className='bg-primary text-[13px] py-3 px-5
                            text-white rounded-[10px] grow4 cursor-pointer w-[160px]'
                            onClick={handleQuoteModalOpen}
                            >
                                Get a Quote
                            </button>
                        </div>
                    </div>

                    {/* FOR MOBILE */}
                    
                    <div className="md:hidden flex justify-end flex-1 
                    items-center">
                        <div className="flex items-center z-20 ss:gap-8 
                        gap-5">
                            <div className='flex justify-center 
                            items-center relative'>
                                <a href='/cart'>
                                    <IoCartOutline
                                    className='text-primary ss:text-[35px] 
                                    text-[30px]'
                                    />
                                    {itemCount > 0 && (
                                    <span className='absolute top-0 right-0
                                    bg-greenDeep text-white rounded-full 
                                    text-[10px] w-4 h-4 flex items-center 
                                    justify-center'>
                                        {itemCount}
                                    </span>
                                    )}
                                </a>
                            </div>
                            
                            {toggle ? (
                                <BsX
                                    size={38}
                                    className="object-contain cursor-pointer"
                                    style={{ color: '#050759' }}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        enableScroll();
                                    }}
                                />
                                ) : (
                                <IoMenu
                                    size={38}
                                    className="object-contain cursor-pointer"
                                    style={{ color: '#050759' }}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        disableScroll();
                                    }}
                                />
                            )}
                        </div>

                        {toggle && (
                            <div className="fixed top-20 left-0 w-full h-screen 
                            bg-black bg-opacity-50 z-10 navsmooth" 
                            onClick={() => setToggle(false)} />
                        )}

                        <div ref={menuRef}
                            className={`p-6 ss:mt-20 mt-20 absolute top-0 
                            right-0 z-10 flex-col ss:w-[70%] w-full bg-white 
                            shadow-lg ss:px-16 h-[80vh] overflow-y-auto
                            ${toggle 
                                ? 'menu-slide-enter menu-slide-enter-active' 
                                : 'menu-slide-exit menu-slide-exit-active'}`
                            }
                        >
                            <ul className="list-none flex flex-col 
                            ss:gap-4 gap-4 ss:mb-14 mb-10">
                            {navLinks.map((link) => (
                                <li
                                key={link.id}
                                className='text-decoration-none flex 
                                flex-col'
                                onClick={() => toggleMenu(link.id)}
                                >
                                    <div className='flex flex-row 
                                    items-center ss:gap-2 gap-2'>
                                        <h3 className='text-main 
                                        ss:text-[16px] text-[15px] 
                                        font-medium'>
                                            {link.title}
                                        </h3>

                                        <TiArrowSortedDown 
                                            className='text-main ss:text-[18px]
                                            text-[16px]' 
                                        />
                                    </div>
                                    
                                    {openMenuId === link.id && (
                                        <div className='mt-2 fade-in ml-2' 
                                        style={{ maxHeight: '30vh', 
                                        overflowY: 'auto' }}>
                                            <div className='flex flex-col 
                                            ss:gap-2 gap-2'>
                                                {link.links.map((subLink, index) => (
                                                <a
                                                    key={index}
                                                    href={subLink.route}
                                                    className="ss:text-[15px] 
                                                    text-[14px] text-main"
                                                >
                                                    {subLink.name}
                                                </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                            </ul>

                            <div className='flex flex-row bg-main2 w-full 
                            rounded-[8px] border-[1px] border-primaryalt 
                            py-2 px-2 gap-3 justify-between items-center relative'
                            >
                                <IoSearchOutline className='text-main 
                                    ss:text-[28px] text-[27px]' 
                                />
                                <input
                                    type='search'
                                    placeholder={currentCategory ? `Search ${currentCategory}` : 'Search for products'}
                                    className='w-full text-black 
                                    ss:text-[15px] text-[13px] 
                                    placeholder:text-mainalt outline-none 
                                    border-none bg-transparent'
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          const anchor = document.createElement('a');
                                          anchor.href = `/search?query=${searchTerm}`;
                                          anchor.click();
                                          setToggle(!toggle);
                                        }
                                    }}
                                />

                                <a href={`/search?query=${searchTerm}`}
                                className='bg-primary ss:text-[15px] 
                                text-[12px] justify-end py-1.5 px-5 
                                text-white rounded-[5px]'
                                onClick={() => {
                                    setToggle(!toggle);
                                }}
                                >
                                    Search
                                </a>

                                {isDropdownOpen && suggestions.length > 0 && (
                                    <div className='absolute top-full mt-1 
                                    bg-main2 shadow-md left-0 right-0 ss:p-3 p-2
                                    rounded-md max-h-30 overflow-y-auto'>
                                        {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className='p-1.5 hover:bg-main2 font-medium
                                            cursor-pointer text-main ss:text-[15px] text-[13px]'
                                            onClick={() => handleSuggestionClick(suggestion.categorySlug, suggestion.slug)}
                                        >
                                            {suggestion.name}
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className='bg-primary ss:py-4 
                            py-3 px-4 w-full text-white rounded-[8px] 
                            mt-4 ss:text-[17px] text-[13px]' 
                            onClick={() => {
                                setToggle(!toggle);
                                handleQuoteModalOpen();
                            }}
                            >
                                Get a Quote
                            </button>

                            <div className='flex justify-center
                            ss:gap-8 gap-5 items-center mt-12 bg-main2 
                            rounded-[8px] ss:py-3 py-3'>
                                <div className='flex justify-center 
                                ss:gap-6 gap-5 items-center'>
                                    <HiOutlineChat className='text-main
                                        ss:text-[23px] text-[21px]' 
                                    />

                                    <a href='mailto:fedeltileslimited@gmail.com'>
                                        <FiMail className='text-main 
                                            ss:text-[23px] text-[21px]' 
                                        />
                                    </a>

                                    <a href='https://wa.me/2349169861311' 
                                    target='_blank' rel="noreferrer">
                                        <RiWhatsappLine 
                                            className='text-main ss:text-[23px] 
                                            text-[21px]' 
                                        />
                                     </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {isQuoteModalOpen && (
            <QuoteModal
                onClose={() => setIsQuoteModalOpen(false)}
            />
        )}
    </nav>
  );
};

export default Navbar;
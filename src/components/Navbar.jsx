import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '../styles';
import { HiOutlineChat } from 'react-icons/hi';
import { navLinks } from '../constants';
import { google, logo } from '../assets';
import { TiArrowSortedDown } from "react-icons/ti";
import { RiWhatsappLine } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { IoCartOutline, IoSearchOutline, IoMenu } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { client } from '../sanity';
import { useNavigate, useParams } from 'react-router-dom';

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
            <div className={`w-full md:bg-main2 ${styles.paddingX}
            hidden md:flex`}>
                <div className='w-full flex justify-between items-center 
                max-w-[82rem] mx-auto md:py-3 ss:py-4 py-3'>
                    <div className="flex items-center w-full">
                        <ul className="list-none flex flex-row gap-6">
                            {navLinks.map((link, index) => (
                            <li
                                key={link.id}
                                className='text-decoration-none cursor-pointer 
                                py-2 flex flex-row gap-2 items-center relative'
                                onMouseEnter={() => toggleMenu(link.id)}
                                onMouseLeave={() => toggleMenu(null)}
                            >
                                <h3 className='text-main text-[14px] font-medium'>
                                    {link.title}
                                </h3>
                                
                                <TiArrowSortedDown 
                                    className='text-main text-[16px]'
                                />

                                {openMenuId === link.id && (
                                    <div className={`absolute top-full ${index === 0 ? 
                                    'left-0 transform-none' 
                                    : 'left-1/2 transform -translate-x-1/2'} 
                                    fade-in border-[1px] border-main2 z-10`}>
                                        <div className="bg-white shadow-xl p-6
                                        flex flex-col gap-2.5 z-20"
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

                    <div className='flex justify-center gap-8 flex-row
                    items-center'
                    >
                        <div className='flex justify-center gap-6 flex-row
                        items-center'>
                            <PiLineVerticalThin className='text-main text-[25px]'/>

                            <HiOutlineChat
                                className='text-main text-[22px] grow4 cursor-pointer'
                            />

                            <a href='mailto:fedeltileslimited@gmail.com'>
                                <FiMail 
                                    className='text-main text-[22px] grow4 cursor-pointer'
                                />
                            </a>
                            
                            <a href='https://wa.me/2349169861311' 
                            target='_blank' rel="noreferrer">
                                <RiWhatsappLine 
                                    className='text-main text-[22px] grow4 cursor-pointer'
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
                max-w-[82rem] mx-auto md:py-3 ss:py-4 py-4'>
                    <a href='/'>
                        <img
                            src={logo} alt='logo'
                            className='md:w-[120px] ss:w-[120px] w-[100px] 
                            h-auto cursor-pointer'
                        />
                    </a>

                    <div className="hidden md:flex items-center w-full
                    gap-10 ml-12">
                        <div className='flex w-full justify-center relative'>
                            <div className='flex flex-row bg-main2 w-full
                            rounded-[10px] border-[1px] border-primaryalt 
                            py-2 px-2 gap-3 justify-between items-center'>
                                <IoSearchOutline
                                    className='text-main text-[20px]'
                                />

                                <input
                                    type='search'
                                    placeholder={currentCategory ? `Search ${currentCategory}` : 'Search for products'}
                                    className='w-full text-black text-[14px]
                                    placeholder:text-mainalt outline-none
                                    border-none bg-transparent'
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                />

                                <button className='bg-primary text-[13px] 
                                py-1.5 px-5 text-white rounded-[5px] grow4 
                                cursor-pointer justify-end'
                                // onClick={() => {
                                //     setToggle(!toggle);
                                // }}
                                >
                                    Search
                                </button>

                                {isDropdownOpen && suggestions.length > 0 && (
                                    <div className='absolute top-full mt-3 
                                    bg-white shadow-lg left-0 right-0 p-3
                                    rounded-md max-h-60 overflow-y-auto'>
                                        {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.slug}
                                            className='p-1.5 hover:bg-main2 font-medium
                                            cursor-pointer text-main text-[15px]'
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
                                        className='text-primary text-[35px] grow4 
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

                            <button className='bg-primary text-[14px] py-3 px-5
                            text-white rounded-[10px] grow4 cursor-pointer w-[160px]'
                            // onClick={() => {
                            //     setToggle(!toggle);
                            // }}
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
                                    }}
                                />
                                ) : (
                                <IoMenu
                                    size={38}
                                    className="object-contain cursor-pointer"
                                    style={{ color: '#050759' }}
                                    onClick={() => {
                                        setToggle(!toggle);
                                    }}
                                />
                            )}
                        </div>

                        <div ref={menuRef}
                            className={`p-6 ss:mt-24 mt-20 absolute top-0 
                            right-0 z-10 flex-col w-full bg-white shadow-lg
                            ss:px-16
                            ${toggle 
                                ? 'menu-slide-enter menu-slide-enter-active' 
                                : 'menu-slide-exit menu-slide-exit-active'}`}
                            style={{ maxHeight: '90vh', overflowY: 'auto' }} 
                        >
                            <ul className="list-none flex flex-col 
                            ss:gap-6 gap-4 ss:mb-14 mb-10">
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
                                        ss:text-[18px] text-[15px] 
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
                            py-2 px-2 gap-3 justify-between items-center'
                            >
                                <IoSearchOutline className='text-main 
                                    ss:text-[28px] text-[27px]' 
                                />
                                <input
                                    type='search'
                                    placeholder='Search for products'
                                    className='w-full text-black 
                                    ss:text-[15px] text-[13px] 
                                    placeholder:text-mainalt outline-none 
                                    border-none bg-transparent'
                                />

                                <button className='bg-primary 
                                ss:text-[15px] text-[12px] justify-end 
                                py-1.5 px-5 text-white rounded-[5px]'>
                                    Search
                                </button>
                            </div>

                            <button className='bg-primary ss:py-4 
                            py-3 px-4 w-full text-white rounded-[8px] 
                            mt-4 ss:text-[17px] text-[13px]' 
                            onClick={() => setToggle(!toggle)}>
                                Get a Quote
                            </button>

                            <div className='flex justify-center 
                            ss:gap-8 gap-4 items-center mt-12 bg-main2 
                            rounded-[8px] ss:py-3 py-2'>
                                <div className='flex justify-center 
                                ss:gap-6 gap-5 items-center'>
                                    <HiOutlineChat className='text-main
                                        ss:text-[23px] text-[20px]' 
                                    />

                                    <a href='mailto:fedeltileslimited@gmail.com'>
                                        <FiMail className='text-main 
                                            ss:text-[23px] text-[20px]' 
                                        />
                                    </a>

                                    <a href='https://wa.me/2349169861311' 
                                    target='_blank' rel="noreferrer">
                                        <RiWhatsappLine 
                                            className='text-main ss:text-[23px] 
                                            text-[20px]' 
                                        />
                                     </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
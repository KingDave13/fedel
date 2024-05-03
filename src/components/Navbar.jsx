import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '../styles';
import { HiOutlineMenuAlt3, HiOutlineChat } from 'react-icons/hi';
import { navLinks } from '../constants';
import { logo } from '../assets';
import { TiArrowSortedDown } from "react-icons/ti";
import { RiWhatsappLine } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const [toggle, setToggle] = useState(false);
const menuRef = useRef(null);
const navigate = useNavigate();


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


  return (
    <nav className='w-full flex items-center fixed 
       top-0 z-20 navsmooth'
    >
        <div className='flex flex-col w-full items-center'>
            <div className={`w-full md:bg-main2 ${styles.paddingX}
            hidden md:flex`}>
                <div className='w-full flex justify-between items-center 
                max-w-[86rem] mx-auto md:py-3 ss:py-4 py-3'>
                    <div className="flex items-center w-full">
                        <ul className="list-none flex flex-row gap-8">
                            {navLinks.map((link) => (
                            <li
                                key={link.id}
                                className='text-decoration-none cursor-pointer
                                flex flex-row gap-2 items-center'
                                // onClick={() => {
                                //   if (link.special) {
                                //     navigate(link.route);
                                //   }
                                // }}
                            >
                                <h3 className='text-main text-[16px] font-medium'>
                                    {link.title}
                                </h3>
                                
                                <TiArrowSortedDown 
                                    className='text-main text-[19px]'
                                />
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
                                className='text-main text-[23px] grow4 cursor-pointer'
                            />

                            <FiMail 
                                className='text-main text-[23px] grow4 cursor-pointer'
                            />

                            <RiWhatsappLine 
                                className='text-main text-[23px] grow4 cursor-pointer'
                            />
                        </div>

                        <div className='bg-main text-[16px] py-2 px-4
                        text-white rounded-[5px]'>
                            GOOGLE
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-full flex ${styles.paddingX}`}>
                <div className='w-full flex justify-between items-center 
                max-w-[86rem] mx-auto md:py-3 ss:py-4 py-4'>
                    <img src={logo} alt='logo'
                        className='md:w-[150px] ss:w-[150px] w-[120px] h-auto'
                    />

                    <div className="hidden md:flex items-center w-full
                    gap-12 ml-12">
                        <div className='flex w-full justify-center'>
                            <div className='flex flex-row bg-main2 w-full
                            rounded-[10px] border-[1px] border-primaryalt 
                            py-2 px-2 gap-3 justify-between items-center'>
                                <IoSearchOutline
                                    className='text-main text-[22px]'
                                />

                                <input
                                    type='search'
                                    placeholder='Search for products'
                                    className='w-full text-black text-[15px]
                                    placeholder:text-mainalt outline-none
                                    border-none bg-transparent'
                                />

                                <button className='bg-primary text-[15px] 
                                py-1.5 px-5 text-white rounded-[5px] grow4 
                                cursor-pointer justify-end'
                                // onClick={() => {
                                //     setToggle(!toggle);
                                // }}
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className='flex gap-12 items-center'>
                            <div className='flex justify-center items-center'>
                                <IoCartOutline
                                    className='text-primary text-[35px] grow4 
                                    cursor-pointer'
                                />
                            </div>

                            <button className='bg-primary text-[15px] py-3 px-5
                            text-white rounded-[10px] grow4 cursor-pointer w-[150px]'
                            // onClick={() => {
                            //     setToggle(!toggle);
                            // }}
                            >
                                Get a Quote
                            </button>
                        </div>
                    </div>

                    {/* FOR MOBILE */}
                    
                    <div className="md:hidden flex justify-end flex-1 items-center">
                        <div className="flex items-center z-20 ss:gap-8
                        gap-6">
                            <IoCartOutline
                                className='text-primary ss:text-[35px] 
                                text-[35px]'
                            />

                            {toggle ? (
                            <BsX
                                size={40}
                                className="object-contain cursor-pointer"
                                style={{ color: '#050759' }}
                                onClick={() => setToggle(!toggle)}
                            />
                            ) : (
                            <HiOutlineMenuAlt3
                                size={40}
                                className="object-contain cursor-pointer"
                                style={{ color: '#050759' }}
                                onClick={() => setToggle(!toggle)}
                            />
                            )}
                        </div>
                    
                        <div ref={menuRef}
                            className={`p-6 mt-20 absolute top-0 right-0 
                            z-10 flex-col w-full
                            ${toggle ? 'menu-slide-enter menu-slide-enter-active' 
                            : 'menu-slide-exit menu-slide-exit-active'}`}
                        >
                            <ul className="list-none flex flex-col 
                            ss:gap-6 gap-4 ss:mb-14 mb-12">
                                {navLinks.map((link) => (
                                    <li
                                        key={link.id}
                                        className='text-decoration-none
                                        flex flex-row ss:gap-2 gap-1 
                                        items-center'
                                        // onClick={() => {
                                        //   if (link.special) {
                                        //     navigate(link.route);
                                        //   }
                                        // }}
                                    >
                                        <h3 className='text-main ss:text-[17px] text-[15px] 
                                        font-medium'>
                                            {link.title}
                                        </h3>
                                        
                                        <TiArrowSortedDown 
                                            className='text-main ss:text-[18px]
                                            text-[16px]'
                                        />
                                    </li>
                                ))}
                            </ul>

                            <div className='flex flex-row bg-main2 w-full
                            rounded-[8px] border-[1px] border-primaryalt 
                            py-2 px-2 gap-3 justify-between items-center'>
                                <IoSearchOutline
                                    className='text-main ss:text-[28px]
                                    text-[27px]'
                                />

                                <input
                                    type='search'
                                    placeholder='Search for products'
                                    className='w-full text-black 
                                    ss:text-[15px] text-[14px]
                                    placeholder:text-mainalt outline-none
                                    border-none bg-transparent'
                                />

                                <button className='bg-primary ss:text-[15px]
                                text-[13px] justify-end
                                py-1.5 px-5 text-white rounded-[5px]'
                                // onClick={() => {
                                //     setToggle(!toggle);
                                // }}
                                >
                                    Search
                                </button>
                            </div>

                            <button className='bg-primary ss:py-4 py-3 
                            px-4 w-full text-white rounded-[8px] mt-4 
                            ss:text-[17px] text-[14px]'
                            onClick={() => {
                                setToggle(!toggle);
                            }}
                            >
                                Get a Quote
                            </button>

                            <div className='flex justify-center ss:gap-8
                            gap-4 items-center mt-12 bg-main2 rounded-[8px]
                            ss:py-3 py-2'
                            >
                                <div className='flex justify-center 
                                ss:gap-6 gap-5 items-center'>
                                    <HiOutlineChat
                                        className='text-main 
                                        ss:text-[23px] text-[20px]'
                                    />

                                    <FiMail 
                                        className='text-main
                                        ss:text-[23px] text-[20px]'
                                    />

                                    <RiWhatsappLine 
                                        className='text-main
                                        ss:text-[23px] text-[20px]'
                                    />
                                </div>

                                <div className='bg-main text-[14px] py-1 px-4
                                text-white rounded-[5px]'>
                                    GOOGLE
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
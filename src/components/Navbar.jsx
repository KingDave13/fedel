import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '../styles';
import { HiOutlineMenuAlt3, HiOutlineChat } from 'react-icons/hi';
import { navLinks } from '../constants';
import { logo } from '../assets';
import { TiArrowSortedDown } from "react-icons/ti";
import { RiWhatsappLine } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
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
                                className='text-main text-[24px] grow4 cursor-pointer'
                            />

                            <FiMail 
                                className='text-main text-[24px] grow4 cursor-pointer'
                            />

                            <RiWhatsappLine 
                                className='text-main text-[24px] grow4 cursor-pointer'
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
                max-w-[86rem] mx-auto md:py-3 ss:py-4 py-3'>
                    <img src={logo} alt='logo'
                        className='md:w-[150px] ss:w-[60px] w-[45px] h-auto'
                    />

                    <div className="flex items-center w-full hidden md:flex">
                        
                    </div>

                    <div className='hidden md:flex justify-center gap-8 flex-row
                    items-center'
                    >
                        <div className='flex justify-center gap-6 flex-row
                        items-center'>
                            <PiLineVerticalThin className='text-main text-[25px]'/>

                            <HiOutlineChat
                                className='text-main text-[24px] grow4 cursor-pointer'
                            />

                            <FiMail 
                                className='text-main text-[24px] grow4 cursor-pointer'
                            />

                            <RiWhatsappLine 
                                className='text-main text-[24px] grow4 cursor-pointer'
                            />
                        </div>

                        <button className='bg-primary text-[16px] py-2 px-4
                        text-white rounded-[5px]'
                        // onClick={() => {
                        //     setToggle(!toggle);
                        // }}
                        >
                            Get
                        </button>
                    </div>

                    {/* FOR MOBILE */}
                    
                    <div className="md:hidden flex justify-end flex-1 items-center
                    mt-3">
                        <div className="flex items-center z-20">
                            {toggle ? (
                            <BsX
                                size={40}
                                className="object-contain cursor-pointer"
                                style={{ color: '#021e31' }}
                                onClick={() => setToggle(!toggle)}
                            />
                            ) : (
                            <HiOutlineMenuAlt3
                                size={40}
                                className="object-contain cursor-pointer"
                                style={{ color: '#021e31' }}
                                onClick={() => setToggle(!toggle)}
                            />
                            )}
                        </div>
                    
                        <div ref={menuRef}
                            className={`p-6 ss:mt-28 mt-24 bg-primaryalt absolute top-0 right-0 
                            z-10 flex-col w-full shadow-xl
                            ${toggle ? 'menu-slide-enter menu-slide-enter-active' 
                            : 'menu-slide-exit menu-slide-exit-active'}`}
                        >
                            <ul className="list-none flex flex-row 
                            ss:gap-8 gap-6">
                            {navLinks.map((link) => (
                            <li
                                key={link.id}
                                className='text-decoration-none cursor-pointer
                                flex flex-row ss:gap-2 gap-1 items-center'
                                // onClick={() => {
                                //   if (link.special) {
                                //     navigate(link.route);
                                //   }
                                // }}
                            >
                                <h3 className='text-main ss:text-[16px] text-[14px] 
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

                            <button className='bg-main text-[16px] py-2 px-4
                            text-white rounded-[5px] mt-5 ss:text-[20px] text-[14px]'
                            onClick={() => {
                                setToggle(!toggle);
                            }}
                            >
                                Our Newsletter
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
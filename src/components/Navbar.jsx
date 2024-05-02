import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '../styles';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { navLinks } from '../constants';
import { logo } from '../assets';
import { Link, useNavigate } from 'react-router-dom';

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
    <nav className={`${styles.paddingX} w-full flex items-center fixed 
      md:py-3 ss:py-4 py-3 top-0 z-20 navsmooth bg-main2`}
    >
      <div className="w-full flex justify-between items-center 
      max-w-[86rem] mx-auto">
        <div className="flex items-center w-full hidden md:flex">
          <ul className="list-none flex flex-row gap-14">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className='text-main hover:text-textalt grow3 
                text-[17px] text-decoration-none cursor-pointer 
                font-medium'
                // onClick={() => {
                //   if (link.special) {
                //     navigate(link.route);
                //   }
                // }}
              >
                {link.title}
              </li>
            ))}
          </ul>
        </div>

        <button className='hidden md:flex bg-main grow justify-center
          text-[16px] py-3 w-[20%] text-white font-medium rounded-full'
        >
            Our Newsletter
        </button>

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
          
          <div
            ref={menuRef}
            className={`p-6 ss:mt-28 mt-24 bg-primaryalt absolute top-0 right-0 
            z-10 flex-col w-full shadow-xl
            ${toggle ? 'menu-slide-enter menu-slide-enter-active' 
            : 'menu-slide-exit menu-slide-exit-active'}`}
          >
            <ul className="list-none flex justify-end 
            flex-col">
              {navLinks.map((link, index) => (
                <li
                  key={link.id}
                  className='text-primary font-medium cursor-pointer ss:text-[20px] 
                  text-[17px] w-full'
                  onClick={() => {
                    setToggle(!toggle);
                    // if (link.special) {
                    //   navigate(link.route);
                    // }
                  }}
                >
                  {link.title}
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
    </nav>
  );
};

export default Navbar;


{/* <Link to='/'
    onClick={() => {
    window.scrollTo(0, 0);
    }}>
    <img src={logo} alt='logo'
    className='md:w-[80px] ss:w-[60px] w-[45px] h-auto'/>
</Link> */}
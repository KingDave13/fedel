import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { BiCopyright } from 'react-icons/bi';
import { footerLinks, socialMedia } from '../constants';
import { logoalt } from '../assets';
import React from 'react';

const Footer = () => {
  return (
    <section className='relative w-full md:min-h-[800px] ss:min-h-[7000px] 
    min-h-[450px] flex items-center flex-col'>
      <div className='flex items-center w-full relative'>
        <motion.div variants={textVariant()} className='flex flex-col w-full'>
          <div className='flex flex-col w-full md:gap-6 ss:gap-5 gap-5'>
            <img src={logoalt} alt='logo' className='md:w-[200px] 
            ss:w-[180px] w-[160px] h-auto' />

            <p className='text-white md:text-[15px] ss:text-[14px] 
            text-[13px] md:leading-[25px] ss:leading-[22px] leading-[20px]'>
              Fedel Tiles Limited is a registered company and certified
              retailer of tiles and other home/sanitation materials in
              Nigeria.
            </p>
            
            <div className='flex md:gap-5 ss:gap-5 gap-3 items-center'>
                {socialMedia.map((social, index) => (
                    <a target='_blank' href={social.link} rel="noreferrer" key={index}>
                        <img src={social.image} 
                            className='md:w-6 ss:w-5 w-5 h-auto'
                        />
                    </a>
                ))}
            </div>
          </div>
          
          <div className='w-full flex md:flex-row ss:flex-row flex-col 
          md:mt-8 ss:mt-8 mt-6'>
            {footerLinks.map((footerLink, index) => (
              <div key={index} className='flex flex-col md:my-4 ss:my-4
              my-3 w-full'>
                <h4 className={`font-bold md:text-[18px] ss:text-[15px] 
                text-[14px] text-white 
                  ${index !== footerLinks.length - 1 ? 'md:mr-10 ss:mr-8 mr-8' : 'mr-12'}`}>
                  {footerLink.title}
                </h4>

                <ul className='list-none md:mt-5 ss:mt-3 mt-2 w-full 
                justify-between flex flex-col'>
                  {footerLink.links.map((Link, index) => (
                    <a target='blank' href={Link.route} key={Link.name}>
                      <li className={`md:text-[15px] ss:text-[15px] grow2
                      text-[13px] md:leading-[23px] ss:leading-[15px] leading-[12px]
                      text-white hover:text-secondary cursor-pointer 
                      ${index !== footerLink.links.length - 1 ? 'md:mb-2.5 ss:mb-2 mb-2' : 'mb-0'}`}>
                        {Link.name}
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={textVariant()} className='flex flex-col w-full'>
        <div className='flex md:mt-16 ss:mt-10 mt-8 border-t-[1px] 
        border-main md:pt-10 ss:pt-8 pt-6 items-center'>
          <BiCopyright className='sm:mr-2 mr-1 md:text-[20px] 
          ss:text-[18px] text-[15px] md:mt-1 ss:mt-1 mt-0 text-white' />

          <p className='md:text-[14px] ss:text-[16px] text-[12px] 
          text-white md:mt-1 ss:mt-1 mt-0.5'>
            2024 Fedel Tiles Limited. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </section>
  )
};

export default SectionWrapper(Footer, '');
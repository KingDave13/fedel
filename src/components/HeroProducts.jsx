import { heroImageProduct } from '../assets';
import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const HeroProducts = () => {
  
  return (
    <section className='relative w-full md:min-h-[700px] ss:min-h-[800px] 
    items-center flex md:mb-0 ss:mb-0 mb-36'>
        <div className='relative items-center w-full max-w-[86rem]
        md:mt-28 ss:mt-56 mt-16 rounded-[30px] flex md:p-12 ss:p-10 p-6'
        >
            <div className='items-center w-full flex flex-col md:gap-5 
            ss:gap-5 gap-3'>
                <motion.div variants={textVariant()}
                className='justify-center items-center'
                >
                    <h1 className='text-secondary font-bold md:text-[43px]
                    ss:text-[40px] text-[30px] tracking-tight'>
                        Products
                    </h1>
                </motion.div> 

                <motion.div variants={textVariant()}
                className='justify-center items-center md:gap-3 
                ss:gap-2 gap-2 text-white md:text-[16px] ss:text-[15px]
                text-[13px]'
                >
                    <p>Home</p>
                    <p>  </p>
                    <p>Journals</p>
                </motion.div>           
            </div>
        </div>
    </section>  
  )
};

export default SectionWrapper(HeroProducts, '');
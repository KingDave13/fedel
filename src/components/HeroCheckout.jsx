import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const HeroCheckout = () => {
  
  return (
    <section className='relative w-full md:min-h-[50px] ss:min-h-[50px] 
    items-center flex'>
        <div className='relative items-center w-full max-w-[86rem]
        md:mt-20 ss:mt-8 mt-12 flex'
        >
            <motion.div variants={textVariant()}
            className='flex md:gap-4 ss:gap-2 gap-2 
            text-main md:text-[15px] ss:text-[15px] text-[13px]'
            >
              <a href='/' className='hover:text-secondary'>
                Home
              </a>
              <p> {'>'} </p>

              <a href='/cart' className='hover:text-secondary'>
                Cart
              </a>

              <p> {'>'} </p>
              <p>Checkout</p>
            </motion.div>
        </div>
    </section>  
  )
};

export default SectionWrapper(HeroCheckout, '');
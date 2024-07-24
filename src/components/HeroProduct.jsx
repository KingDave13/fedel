import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const HeroProduct = ({ category, product }) => {
  
  return (
    <section className='relative w-full md:min-h-[50px] ss:min-h-[50px] 
    items-center flex'>
        <div className='relative items-center w-full max-w-[86rem]
        md:mt-28 ss:mt-16 mt-16 flex'
        >
            <motion.div variants={textVariant()}
            className='flex md:gap-4 ss:gap-2 gap-2 
            text-main md:text-[16px] ss:text-[15px] text-[13px]'
            >
                <p>Home</p>
                <p> {'>'} </p>
                <p>Products</p>
                <p> {'>'} </p>
                <p>{category.name}</p>
                <p> {'>'} </p>
                <p>{product.name}</p>
            </motion.div>
        </div>
    </section>  
  )
};

export default SectionWrapper(HeroProduct, '');
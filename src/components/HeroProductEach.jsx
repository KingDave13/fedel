import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapperAlt } from '../hoc';

const HeroProductEach = ( {category} ) => {
  
  return (
    <section className='relative w-full md:min-h-[100px] ss:min-h-[100px] 
    items-center flex md:px-0 ss:px-16 px-6 md:py-0 ss:py-4 py-4'>
        <div className='relative items-center w-full max-w-[86rem] heroProducts
        md:mt-44 ss:mt-28 mt-24 md:rounded-[18px] ss:rounded-[18px] 
        rounded-[12px] flex md:p-12 ss:p-10 p-6'
        >
            <div className='w-full flex flex-col gap-1'>
                <motion.div variants={textVariant()}
                className='flex items-center'
                >
                    <h1 className='text-secondary font-bold md:text-[40px]
                    ss:text-[40px] text-[30px]'>
                        {category.name}
                    </h1>
                </motion.div> 

                <motion.div variants={textVariant()}
                className='flex md:gap-4 ss:gap-2 gap-2 
                text-white md:text-[16px] ss:text-[15px] text-[13px]'
                >
                    <p>Home</p>
                    <p> {'>'} </p>
                    <p>Products</p>
                    <p> {'>'} </p>
                    <p>{category.name}</p>
                </motion.div>           
            </div>
        </div>
    </section>  
  )
};

export default SectionWrapperAlt(HeroProductEach, '');
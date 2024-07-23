import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapperAlt } from '../hoc';

const HeroText = ({ text }) => {
  
  return (
    <section className='w-full md:min-h-[50px] ss:min-h-[50px] 
    items-center flex md:pt-6 md:px-0 sm:px-16 px-6'>
        <div className='items-center w-full max-w-[86rem]'>
            <motion.div variants={textVariant()}
            className='flex text-main md:text-[16px] ss:text-[15px] 
            text-[13px] font-medium md:max-w-[800px] md:leading-[23px]
            ss:leading-[20px] leading-[18px]'
            >
                <p>{text}</p>
            </motion.div>
        </div>
    </section>  
  )
};

export default SectionWrapperAlt(HeroText, '');
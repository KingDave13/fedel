import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const CTA = () => {

  return (
    <section className='w-full md:min-h-[300px] ss:min-h-[300px] 
    min-h-[250px]'>
        <div className='flex max-w-[86rem] items-center w-full 
        md:rounded-3xl ss:rounded-3xl rounded-2xl justify-center cta
        md:p-14 ss:p-12 p-8'>
            <motion.div variants={textVariant()}
            className='flex flex-col items-center justify-center
            md:gap-6 ss:gap-5 gap-4'>
                <h2 className='text-white md:text-[28px] ss:text-[22px]
                text-[18px] tracking-tight font-bold text-center
                md:max-w-[550px] ss:max-w-[500px] max-w-[250px]
                md:leading-[35px] ss:leading-[32px] leading-[23px]'>
                    What are you waiting for? Begin exploring our 
                    exquisite array of 
                    <span className='text-secondary'> premium and durable tiles and 
                    coverings!
                    </span>
                </h2>

                <a href='/products' className='border-white border-[1px] 
                grow5 md:text-[15px] ss:text-[15px] text-[13px] md:py-3 
                ss:py-3 py-2 md:px-10 ss:px-10 px-6 text-white 
                rounded-lg'
                >
                    Discover Products
                </a>
            </motion.div>                
        </div>
    </section>
  )
};

export default SectionWrapper(CTA, '');
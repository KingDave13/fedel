import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { steps } from '../constants';
import { arrowRight } from '../assets';

const StepCard = ({ index, title, image, description }) => {
    
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='flex items-center justify-center
            md:gap-10 ss:gap-8 gap-6'>
                <img 
                    src={image}
                    alt='product step'
                    className='md:w-[170px] ss:w-[150px] w-[140px] 
                    md:h-[170px] ss:h-[150px] h-[140px] object-cover'
                />

                <div className='flex flex-col md:gap-3 ss:gap-3
                gap-2 tracking-tight'>
                    <h1 className='text-primary md:text-[22px] ss:text-[20px] 
                    text-[16px] font-bold'>
                        {title}
                    </h1>

                    <p className='text-main font-medium md:leading-[23px]
                    ss:leading-[20px] leading-[18px] md:text-[17px] 
                    ss:text-[15px] text-[13px]'>
                        {description}
                    </p>

                    <div>
                        <a href='/products' 
                        className='inline-flex gap-3 cursor-pointer grow5
                        items-center'>
                            <h1 className='text-primary md:text-[15px] 
                            ss:text-[15px] text-[13px] font-medium'>
                                Browse products
                            </h1>
                            
                            <img src={arrowRight} alt='arrow'
                            className='md:w-5 w-4 md:h-5 h-4'/>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

const Steps = () => {
  return (
    <section className='relative w-full min-h-[700px] mx-auto flex
    items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col'>
            <motion.div variants={textVariant()}
            className='flex flex-col md:gap-2 ss:gap-4 gap-4'>
                <h1 className='text-primary font-bold md:text-[43px]
                ss:text-[40px] text-[30px] tracking-tight md:leading-[60px] 
                ss:leading-[45px] leading-[35px]'>
                    Find and order from us in 4 easy steps
                </h1>
                
                <p className='text-main font-medium md:text-[18px]
                ss:text-[17px] text-[14px] tracking-tight md:max-w-[950px]
                md:leading-[25px] ss:leading-[23px] leading-[20px]'>
                    You do not need to go through too much stress to find 
                    exactly what you're looking for on our website. We've 
                    outlined these simple steps to understand how to 
                    discover and order tiles.
                </p>                
            </motion.div>

            <div className='grid md:gap-16 ss:gap-14 gap-10 md:mt-20 
            md:grid-cols-2 ss:mt-12 mt-8 w-full'>
                {steps.map((step, index) => (
                    <StepCard 
                        key={index} 
                        index={index} 
                        {...step}
                    />
                ))}
            </div>

            <p className='text-mainalt md:text-[16px] ss:text-[15px] 
            text-[12px] tracking-tight w-full font-medium md:text-center
            md:mt-16 ss:mt-10 mt-6 md:leading-[25px] ss:leading-[23px]
            leading-[16px]'>
                Note that some items may have their prices displayed, 
                some may not but not to worry, you can request for 
                their prices directly and you'll be responded to 
                appropriately and swiftly.
            </p>       
        </div>
    </section>
  )
};

export default SectionWrapper(Steps, '');
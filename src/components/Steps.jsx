import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { steps } from '../constants';

const StepCard = ({ index, title, image, description }) => {
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}
        className='p-10 xs:w-[500px] w-full relative'
        whileHover={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', 
        transition: { duration: 0.2, ease: 'easeInOut' } }}
        >
            <div className='w-full flex items-center justify-center
            md:gap-6 ss:gap-6 gap-4'>
                <img 
                    src={image}
                    alt='name'
                    className='w-10 h-10 object-cover'
                />

                <div className='flex flex-col w-full md:gap-3 ss:gap-3
                gap-2'>
                    <h1 className='text-primary md:text-[17px] ss:text-[16px] 
                    text-[13px] font-bold'>
                        {title}
                    </h1>

                    <p className='text-main font-medium 
                    md:text-[16px] ss:text-[16px] text-[14px]'>
                        {description}
                    </p>

                    <div className='flex gap-2'>
                        <p className='text-primary md:text-[15px] ss:text-[15px]
                        text-[13px]'>
                            Browse products
                        </p>

                    </div>
                </div>
            </div>
        </motion.div>
    )
};

const Steps = () => {
  return (
    <section className='relative w-full min-h-[900px] mx-auto flex
    items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col'
        >
            <motion.div variants={textVariant()}
            className='flex flex-col gap-2'>
                <h1 className='text-primary font-bold md:text-[45px]
                ss:text-[45px] text-[33px] tracking-tight'>
                    Find and order from us in 4 easy steps
                </h1>
                
                <p className='text-main font-medium md:text-[20px]
                ss:text-[20px] text-[15px] tracking-tight md:max-w-[950px]
                ss:max-w-[300px]'>
                    You do not need to go through too much stress to find 
                    exactly what you're looking for on our website. We've 
                    outlined these simple steps to understand how to 
                    discover and order tiles.
                </p>                
            </motion.div>

            <div className='flex gap-6 flex-wrap justify-center md:mt-12
            ss:mt-12 mt-8'>
                {steps.map((step, index) => (
                    <StepCard 
                        key={step.name} 
                        index={index} 
                        {...step}
                    />
                ))}
            </div>

            <p className='text-mainalt md:text-[16px] ss:text-[17px] 
            text-[13px] tracking-tight w-full font-medium md:text-center
            md:mt-8 ss:mt-8 mt-6'>
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
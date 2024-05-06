import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { steps } from '../constants';

const StepCard = ({ index, testimonial, image, name, designation }) => {
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}
        className='p-10 xs:w-[500px] w-full relative'
        whileHover={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', 
        transition: { duration: 0.2, ease: 'easeInOut' } }}
        >
            <div className=''>
                <p className='text-primary md:text-[16px] ss:text-[16px] 
                text-[13px] font-normal'>
                    {testimonial}
                </p>

                <div className='md:mt-5 ss:mt-5 mt-4 flex justify-between 
                items-center'>
                    <img 
                        src={image}
                        alt='name'
                        className='w-10 h-10 mr-5 rounded-full 
                        object-cover'
                    />
                    <div className='flex relative mr-5'>
                        <div className='bg-primary w-[1px]
                        h-[45px] bg-opacity-40' />
                    </div> 
                    <div className='flex-1 flex flex-col'>
                        <p className='text-primary font-bold 
                        md:text-[16px] ss:text-[16px] text-[14px]'>
                            {name}
                        </p>
                        <p className='text-primary text-[12px]'>
                            {designation}
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
            className='flex flex-col md:gap-3 ss:gap-3 gap-2'>
                <h1 className='text-primary font-bold md:text-[55px]
                ss:text-[50px] text-[35px] tracking-tight'>
                    Find and order from us in 4 easy steps
                </h1>
                
                <p className='text-main font-medium md:text-[20px]
                ss:text-[20px] text-[15px] tracking-tight md:max-w-[300px]
                ss:max-w-[300px]'>
                    You do not need to go through too much stress to find 
                    exactly what you're looking for on our website. We've 
                    outlined these simple steps to understand how to 
                    discover and order tiles.
                </p>                
            </motion.div>

            <div className='flex gap-14 flex-wrap justify-center md:mt-20
            ss:mt-20 mt-10'>
                {testimonials.map((step, index) => (
                    <StepCard 
                        key={step.name} 
                        index={index} 
                        {...step}
                    />
                ))}
            </div>
        </div>
    </section>
  )
};

export default SectionWrapper(Steps, '');
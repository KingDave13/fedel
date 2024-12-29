import { discoverImg } from '../assets';
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const About = () => {
  return (
    <section className='w-full min-h-[500px] items-center flex flex-col
    md:mt-24 ss:mt-12 mt-3'>
        <div className='w-full'>
            <div className='justify-between w-full flex md:flex-row 
            ss:flex-wrap flex-col items-start md:gap-10 ss:gap-8 gap-5 
            items-center'>
                <motion.div variants={textVariant(0.3)}
                className={`${layout.sectionInfo}`}
                >
                    <h1 className='text-primary font-bold md:text-[40px]
                    ss:text-[35px] text-[25px]'>
                        About Us
                    </h1>
                    
                    <div className='flex relative'>
                        <div className='bg-secondary md:w-[120px] ss:w-[120px]
                    w-[80px] h-[3px]' />
                    </div>

                    <p className='md:mt-8 ss:mt-8 mt-5 text-main md:text-[16px] 
                    ss:text-[15px] text-[13px] md:max-w-[650px] ss:max-w-[700px]
                    md:leading-[27px] ss:leading-[25px] leading-[20px]'>
                    Lifeline Journals is dedicated to the pursuit of 
                    knowledge and the advancement of science across a 
                    wide spectrum of medical and scientific disciplines. 
                    Our journals serve as a platform for researchers, 
                    practitioners, and scholars to share their findings, 
                    fostering collaboration and innovation in their 
                    respective fields.
                    </p>

                    <p className='md:mt-5 ss:mt-5 mt-3 text-main md:text-[16px] 
                    ss:text-[15px] text-[13px] md:max-w-[650px] ss:max-w-[700px]
                    md:leading-[27px] ss:leading-[25px] leading-[20px]'>
                    Our mission is to empower knowledge and foster 
                    innovation across diverse fields of study. We are 
                    committed to providing a platform where 
                    groundbreaking research and critical insights can be 
                    shared, explored, and applied to real-world 
                    challenges. By connecting scholars, professionals, 
                    and learners, we aim to advance understanding, 
                    inspire change, and contribute to the betterment of 
                    society through the dissemination of high-quality, 
                    peer-reviewed content.
                    </p>
                </motion.div>

                <motion.div 
                variants={fadeIn('right', 'tween', 0.2, 0.5)}
                className='md:mt-0 ss:mt-6 mt-2'>
                    <img src={discoverImg} alt='doctors'
                    className='md:h-[350px] ss:h-[350px] h-[220px] w-auto rounded-3xl'
                    />
                </motion.div>
            </div>
        </div>
    </section> 
  )
};

export default SectionWrapper(About, '');
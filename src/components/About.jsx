import { discoverImg } from '../assets';
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

const About = () => {
  return (
    <section className='w-full min-h-[200px] items-center flex flex-col
    md:px-0 ss:px-16 px-6 py-6 md:mt-5'>
        <div className='w-full max-w-[72rem] mx-auto'>
            <div className='justify-between w-full flex flex-row gap-10 
            items-center'>
                <motion.div variants={textVariant(0.3)}
                className={`${layout.sectionInfo}`}
                >
                    <p className='text-main md:text-[16px] 
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

                    <p className='md:mt-6 ss:mt-5 mt-4 text-main md:text-[16px] 
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
                className='md:flex hidden'>
                    <img src={discoverImg} alt='aboutImage'
                    className='h-[350px] w-full rounded-3xl object-cover'
                    />
                </motion.div>
            </div>
        </div>
    </section> 
  )
};

export default About;
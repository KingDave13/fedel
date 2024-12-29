import { useState, useEffect } from 'react';
import { discoverImg } from '../assets';
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { client } from '../sanity';

const About = () => {

    const [aboutText, setAboutText] = useState([]);

    useEffect(() => {
        const query = `
            *[_type == "about"] | {
                paragraph1,
                paragraph2,
            }
        `;
    
        client.fetch(query)
            .then((data) => setAboutText(data))
    }, []);

  return (
    <section className='w-full min-h-[200px] items-center flex flex-col
    md:px-0 ss:px-16 px-6 py-6'>
        <div className='w-full max-w-[72rem] mx-auto'>
            <div className='justify-between w-full flex flex-row gap-16 
            items-center'>
                {aboutText.length > 0 && (
                    <motion.div variants={textVariant(0.3)}
                    className={`${layout.sectionInfo}`}
                    >
                        <p className='text-main md:text-[16px] ss:text-[15px] 
                        text-[14px] md:leading-[27px] ss:leading-[25px] 
                        leading-[21px]'
                        >
                           {aboutText[0].paragraph1}
                        </p>

                        <p className='md:mt-6 ss:mt-5 mt-4 text-main md:text-[16px] 
                        ss:text-[15px] text-[14px] md:leading-[27px] 
                        ss:leading-[25px] leading-[21px]'
                        >
                           {aboutText[0].paragraph2}
                        </p>
                    </motion.div>
                )}
               
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
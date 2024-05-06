import { SectionWrapper } from "../hoc";
import { layout } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useNavigate } from 'react-router-dom';
import { discoverImg } from '../assets';

const Discover = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full md:min-h-[550px] ss:min-h-[550px] 
        min-h-[900px] flex items-center">
            <div className='relative items-center w-full max-w-[86rem]'>
            <motion.div variants={fadeIn('down', 'spring', 0.3)}
                className="flex md:flex-row ss:flex-row flex-col md:gap-10 
                ss:gap-10 gap-12 w-full aboutimage">
                    <motion.div variants={textVariant()}
                    className={`${layout.sectionInfo}`}>
                        <h1 className="text-primary font-bold md:text-[45px]
                        ss:text-[45px] text-[33px] md:leading-[2px] 
                        ss:leading-[2px] leading-[40px]">
                        Safe and secure delivery to wherever you are!
                        </h1>

                        <p className='text-main md:text-[17px] ss:text-[15px] 
                        text-[13px] md:max-w-[700px] ss:max-w-[400px]  
                        md:leading-[23px] font-medium tracking-tight'>
                        Ensuring your satisfaction from start to finish, 
                        Fedel Tiles Limited offers safe and secure 
                        delivery services, no matter where you are. 
                        Our dedicated logistics team meticulously 
                        handles every order, ensuring that your products
                        arrive on time and in pristine condition.
                        </p>

                        <div className="md:mt-8 ss:mt-8 mt-6">
                            <button className='bg-primary grow5 md:text-[15px] 
                            ss:text-[15px] text-[14px] md:py-3 ss:py-3 py-2 
                            md:px-14 ss:px-14 px-6 text-white rounded-lg'
                            // onClick={() => navigate('/products')}
                            >
                                Discover Products
                            </button>
                        </div>
                    </motion.div>

                    <motion.div 
                        variants={fadeIn('left', 'spring', 0.3)}>
                            <img src={discoverImg} alt='Discover Image'
                            className='md:h-[400px] ss:h-[300px] w-auto'
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SectionWrapper(Discover, '');
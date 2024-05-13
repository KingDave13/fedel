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
        min-h-[650px] flex items-center md:mt-0 ss:mt-10 mt-96">
            <div className='relative items-center w-full max-w-[86rem]'>
            <motion.div variants={fadeIn('down', 'spring', 0.3)}
                className="flex md:flex-row ss:flex-row flex-col md:gap-20 
                ss:gap-10 gap-12 w-full">
                    <motion.div variants={textVariant()}
                    className={`${layout.sectionInfo} md:gap-8 ss:gap-8
                    gap-5`}>
                        <h1 className="text-primary font-bold md:text-[43px]
                        ss:text-[40px] text-[30px] md:leading-[50px] 
                        ss:leading-[45px] leading-[35px] tracking-tight">
                            Safe and secure delivery to wherever you are!
                        </h1>

                        <p className='text-main md:text-[18px] ss:text-[17px] 
                        text-[14px] md:max-w-[700px] ss:max-w-[400px]  
                        md:leading-[25px] ss:leading-[25px] leading-[20px] 
                        font-medium tracking-tight'>
                            Ensuring your satisfaction from start to finish, 
                            Fedel Tiles Limited offers safe and secure 
                            delivery services, no matter where you are. 
                            Our dedicated logistics team meticulously 
                            handles every order, ensuring that your products
                            arrive on time and in pristine condition.
                        </p>

                        <div className="">
                            <button className='bg-primary grow5 md:text-[15px] 
                            ss:text-[15px] text-[13px] md:py-4 ss:py-3 py-3 
                            md:px-10 ss:px-10 px-8 text-white rounded-lg'
                            // onClick={() => navigate('/products')}
                            >
                                Discover Products
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeIn('left', 'spring', 0.3)}
                    className="flex-1 w-full">
                        <img src={discoverImg} 
                            alt='Discover Image'
                            className='md:h-[400px] ss:h-[300px] w-full
                            rounded-3xl'
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SectionWrapper(Discover, '');
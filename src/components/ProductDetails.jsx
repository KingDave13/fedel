import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { steps } from '../constants';
import { arrowRight, warranty } from '../assets';
import { IoCartOutline } from "react-icons/io5";
import { TbWorldCheck, TbShieldCheck  } from "react-icons/tb";

const StepCard = ({ index, title, image, description }) => {
    
    return (
        <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='flex items-center justify-center
            md:gap-10 ss:gap-8 gap-6'>
                <img 
                    src={image}
                    alt='product step'
                    className='md:w-[170px] ss:w-[160px] w-[140px] 
                    md:h-[170px] ss:h-[160px] h-[140px] object-cover'
                />

                <div className='flex flex-col md:gap-3 ss:gap-3
                gap-2 tracking-tight'>
                    <h1 className='text-primary md:text-[22px] ss:text-[20px] 
                    text-[16px] font-bold'>
                        {title}
                    </h1>

                    <p className='text-main font-medium md:leading-[23px]
                    ss:leading-[25px] leading-[18px] md:text-[17px] 
                    ss:text-[15px] text-[13px]'>
                        {description}
                    </p>

                    <a href='/products' 
                    className='flex gap-3 cursor-pointer grow5
                    items-center'>
                        <h1 className='text-primary md:text-[15px] 
                        ss:text-[15px] text-[13px] font-medium'>
                            Browse products
                        </h1>
                        
                        <img src={arrowRight} alt='arrow'/>
                    </a>
                </div>
            </div>
        </motion.div>
    )
};

const ProductDetails = ({ product }) => {
  return (
    <section className='relative w-full min-h-[700px] mx-auto flex
    items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col gap-10'>
            <div className='flex items-center w-full bg-main2
            rounded-[20px] flex md:p-8 ss:p-8 p-6'>
                <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex gap-10'>
                        <div className='w-full flex flex-col gap-5
                        items-center'>
                            <h1 className='text-main font-bold md:text-[30px]
                            ss:text-[30px] text-[20px]'>
                                {product.name}
                            </h1>

                            <div className="items-center">
                                <div className='bg-primaryalt w-full 
                                h-[1px]' />
                            </div>

                            <div className='flex flex-col gap-3'>

                            </div>

                            <div className="items-center">
                                <div className='bg-primaryalt w-full 
                                h-[1px]' />
                            </div>

                            <div className='flex flex-col gap-5'>
                                <div className='flex gap-3'>
                                    <h1 className='text-greenDeep
                                    md:text-[30px] ss:text-[30px] text-[20px]
                                    font-bold'>
                                        N
                                    </h1>

                                    <h1 className='text-mainalt font-medium
                                    md:text-[25px] ss:text-[25px] text-[17px]'>
                                        N
                                    </h1>
                                </div>
                                
                                <p className='text-main font-bold
                                md:text-[15px ss:text-[15px] text-[13px]'>
                                    Select Variation
                                </p>

                                <div className='flex flex-wrap gap-3'>

                                </div>

                                <div className='bg-primary flex items-center grow5 py-3 
                                rounded-lg cursor-pointer justify-center gap-3'
                                // onClick={() => {
                                //     setToggle(!toggle);
                                // }}
                                >
                                    <IoCartOutline
                                        className='text-white text-[25px]'
                                    />

                                    <p className='text-white md:text-[14px] ss:text-[14px] 
                                    text-[12px]'>
                                        Add to Cart
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className='flex flex-col border-primaryalt
                        border-[1px] rounded-xl gap-2 items-center
                        w-[150px] py-3'>
                            <TbWorldCheck 
                                className='text-primary text-[40px]'
                            />

                            <p className='text-primary font-semibold
                            text-[12px]'>
                                Worldwide Delivery
                            </p>
                        </div>

                        <div className='flex flex-col border-primaryalt
                        border-[1px] rounded-xl gap-2 items-center
                        w-[150px] py-3'>
                            <img
                                src={warranty}
                                className='text-primary text-[40px]
                                w-8 h-8'
                            />

                            <p className='text-primary font-semibold
                            text-[12px]'>
                                1-Year Warranty
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center w-full bg-main2
            rounded-[20px] flex md:p-8 ss:p-8 p-6'>
                <motion.div variants={textVariant()}
                className='flex flex-col md:gap-6 ss:gap-5 gap-4'>
                    <h1 className='text-main font-bold md:text-[20px]
                    ss:text-[20px] text-[18px] tracking-tight'>
                        Product Description
                    </h1>

                    <div className="items-center justify-center">
                        <div className='bg-main w-full h-[1px]' />
                    </div>
                    
                    <p className='text-main md:text-[18px] ss:text-[17px] 
                    text-[14px] tracking-tight md:leading-[25px] 
                    ss:leading-[26px] leading-[20px] font-medium'>
                        {product.description}
                    </p>

                    <p className='text-main md:text-[18px] ss:text-[17px] 
                    text-[14px] tracking-tight md:leading-[25px] 
                    ss:leading-[26px] leading-[20px] font-medium'>
                        {product.description}
                    </p>

                    <div className="items-center justify-center">
                        <div className='bg-main w-full h-[1px]' />
                    </div>

                    <div className='bg-primary flex items-center grow5 py-3 
                    rounded-lg cursor-pointer justify-center gap-3'
                    // onClick={() => {
                    //     setToggle(!toggle);
                    // }}
                    >
                        <IoCartOutline
                            className='text-white text-[25px]'
                        />

                        <p className='text-white md:text-[14px] ss:text-[14px] 
                        text-[12px]'>
                            Add to Cart
                        </p>
                    </div>
                </motion.div>
            </div>

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
        </div>
    </section>
  )
};

export default SectionWrapper(ProductDetails, '');
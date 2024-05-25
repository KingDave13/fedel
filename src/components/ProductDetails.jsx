import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { arrowRight, warranty } from '../assets';
import { IoCartOutline } from "react-icons/io5";
import { urlFor } from '../sanity';
import { TbWorldCheck, TbShieldCheck  } from "react-icons/tb";

const ImageCard = ({ index, image, product }) => {
    const imageUrl = urlFor(image).url();

    return (
      <motion.div variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
        <div className='square-container'>
            <img
                src={imageUrl}
                alt={product.name}
                className='w-[300px] h-auto rounded-xl'
            />
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
                    <div className='w-full flex gap-16'>
                        <div className='grid md:gap-6 ss:gap-6 gap-4
                        md:grid-cols-2 w-full'>
                            {product.images.map((item, index) => (
                                <ImageCard 
                                    key={index} 
                                    index={index} 
                                    {...item}
                                    image={item}
                                    product={product}
                                />
                            ))}
                        </div>

                        <div className='w-full flex flex-col gap-5'>
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
                                    md:text-[25px] ss:text-[25px] text-[17px]
                                    line-through'>
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
                                alt='warranty'
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
                    
                    <p className='text-main md:text-[17px] ss:text-[17px] 
                    text-[14px] tracking-tight md:leading-[25px] 
                    ss:leading-[26px] leading-[20px] font-medium'>
                        {product.description}
                    </p>

                    <p className='text-main md:text-[17px] ss:text-[17px] 
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
        </div>
    </section>
  )
};

export default SectionWrapper(ProductDetails, '');
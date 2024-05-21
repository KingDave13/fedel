import { useState, useEffect } from "react";
import { Filter } from '../features';
import { client, urlFor } from '../sanity';
import { SectionWrapper } from "../hoc";

const ItemCard = (item) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (item.images && item.images.length > 0) {
            const assetId = item.images[0].asset._ref;
            const imageUrl = urlFor(assetId).url();
            setImageUrl(imageUrl);
        }
    }, [item.images]);

    return (
        <div className='cursor-pointer grow2'>
            <div className='flex items-center justify-center relative'>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={item.name}
                        className='h-[250px] w-full object-cover rounded-lg'
                    />
                )}

                {/* <div className='rounded-full bg-white p-1.5 top-6 right-6
                absolute text-primary md:text-[13px] ss:text-[13px] 
                text-[12px] font-bold'>
                    {category.productCount}+
                </div>

                <div className='flex flex-col md:gap-1 ss:gap-1 gap-1 
                tracking-tight absolute md:p-6 ss:p-6 p-4 bottom-0'>
                    <h1 className='text-secondary md:text-[19px] ss:text-[18px] 
                    text-[15px] font-bold'>
                        {category.name}
                    </h1>

                    <p className='text-white md:leading-[19px]
                    ss:leading-[19px] leading-[16px] md:text-[14px] 
                    ss:text-[14px] text-[12px]'>
                        {category.description}
                    </p>

                    <a href='/' 
                    className='flex gap-3 cursor-pointer grow2
                    items-center mt-1.5'>
                        <h1 className='text-white md:text-[14px] 
                        ss:text-[14px] text-[12px] font-medium'>
                            See products
                        </h1>
                    </a>
                </div> */}
            </div>
        </div>
    )
};

const Product = ({ products }) => {
  return (
    <section className='relative w-full md:min-h-[500px] ss:min-h-[2000px] 
    min-h-[800px] mx-auto flex items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <div className="flex w-full items-center justify-between">

            </div>

            <div className="flex w-full">
                <Filter />

                <div className='grid md:gap-12 ss:gap-12 gap-8 
                md:grid-cols-4'>
                    {products.map((item) => (
                        <ItemCard 
                            key={item._id}
                            {...item}
                        />
                    ))}
                </div>
            </div>
            

            <a href='/products'
            className='flex gap-3 md:mt-16 ss:mt-14 mt-10 
            items-center justify-center grow4'>
                <p className='text-white md:text-[16px] ss:text-[15px] 
                text-[12px]'>
                    See all products
                </p>

                {/* <GoArrowRight
                    className='text-white md:text-[18px]
                    ss:text-[18px] text-[20px]'
                /> */}
            </a>
        </div>
    </section>
  )
};

export default SectionWrapper(Product, '');
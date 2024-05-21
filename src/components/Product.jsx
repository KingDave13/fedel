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
                        className='h-[300px] w-full object-cover rounded-lg'
                    />
                )}
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

                <div className='grid md:gap-8 ss:gap-12 gap-8 
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
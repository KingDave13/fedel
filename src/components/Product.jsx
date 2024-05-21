import { useState, useEffect } from "react";
import { Filter } from '../features';
import { client, urlFor } from '../sanity';
import { TiArrowSortedDown } from "react-icons/ti";
import { filter, refresh } from "../assets";
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
            <div className="flex w-full items-center justify-between
            mb-4">
                <div className="flex-start flex gap-3 items-center">
                    <div className="flex gap-2 items-center cursor-pointer
                    bg-mainalt rounded-md p-2">

                        <p className="text-main font-bold text-[12px]">
                            Filters
                        </p>
                    </div>

                    <div className="flex gap-2 items-center cursor-pointer">

                        <p className="text-main font-bold text-[12px]">
                            Refresh results
                        </p>
                    </div>
                </div>

                <div className="flex-end flex gap-3 items-center">
                    <p className="text-mainalt font-medium text-[12px]">
                        {count} results
                    </p>

                    <div className="flex gap-2">
                        <p className="text-mainalt text-[12px]">
                            Showing:
                        </p>

                        <div className='relative flex items-center'>
                            <select
                                type="text"
                                className="py-1 px-2 border-search 
                                text-main3 cursor-pointer text-[12px] 
                                bg-transparent w-full custom-select
                                font-bold"
                            >
                                <option value="" disabled selected hidden>Most Popular</option>
                                <option value="social_media">Most Relevant</option>
                            </select>
                            <div className='absolute right-2'>
                                <TiArrowSortedDown 
                                    className='text-main text-[15px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
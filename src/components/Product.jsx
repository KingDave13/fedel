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
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 28;
  
    // Logic for pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    // Logic for page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const renderPageNumbers = pageNumbers.map((number) => {
      let buttonClasses = 'pagination-button';
      if (number === currentPage) {
        buttonClasses += ' bg-blue-500 text-white';
      }
      return (
        <button
          key={number}
          className={`border px-3 py-1 ${buttonClasses}`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      );
    });
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  

  return (
    <section className='relative w-full md:min-h-[500px] ss:min-h-[2000px] 
    min-h-[800px] mx-auto flex items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <div className="flex w-full items-center justify-between
            mb-8">
                <div className="flex-start flex gap-10 items-center">
                    <div className="flex gap-4 items-center cursor-pointer
                    bg-main2 rounded-md px-4 py-2.5 hover:bg-main3 navsmooth">
                        <img 
                            src={filter}
                            alt="filter"
                            className="w-5"
                        />
                        <p className="text-main font-semibold text-[14px]">
                            Filters
                        </p>
                    </div>

                    <div className="flex gap-3 items-center grow4
                    cursor-pointer">
                        <img 
                            src={refresh}
                            alt="refresh"
                            className="w-5"
                        />
                        <p className="text-main font-semibold text-[14px]">
                            Refresh results
                        </p>
                    </div>
                </div>

                <div className="flex-end flex gap-10 items-center">
                    <p className="text-main3 font-semibold text-[14px]">
                        {`${products.length} results`}
                    </p>

                    <div className="flex gap-1 items-center">
                        <p className="text-main3 font-medium text-[14px]">
                            Showing:
                        </p>

                        <div className='relative flex items-center'>
                            <select
                                type="text"
                                className="py-1 px-2 mr-3
                                text-main cursor-pointer text-[14px] 
                                bg-transparent w-full custom-select
                                font-bold"
                            >
                                <option value="" disabled selected hidden>Most Popular</option>
                                <option value="social_media">Most Relevant</option>
                            </select>
                            <div className='absolute right-0'>
                                <TiArrowSortedDown 
                                    className='text-main text-[18px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full">
                <Filter />

                <div className="flex w-full flex-col">
                    <div className='grid md:gap-8 ss:gap-12 gap-8 
                    md:grid-cols-4'>
                        {currentProducts.map((item) => (
                            <ItemCard 
                                key={item._id}
                                {...item}
                            />
                        ))}
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handlePreviousPage}
                            className={`border px-3 py-1 ${currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        {renderPageNumbers}
                        <button
                            onClick={handleNextPage}
                            className={`border px-3 py-1 ${currentPage === pageNumbers.length ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
};

export default SectionWrapper(Product, '');
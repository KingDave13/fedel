import { useState, useEffect, useCallback } from "react";
import { Filter } from '../features';
import { urlFor } from '../sanity';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { filter, refresh } from "../assets";
import { SectionWrapper } from "../hoc";

const ItemCard = ({ item, categorySlug }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (item.images && item.images.length > 0) {
            const assetId = item.images[0].asset._ref;
            const imageUrl = urlFor(assetId).url();
            setImageUrl(imageUrl);
        }
    }, [item.images]);

    return (
        <Link to={`/products/${categorySlug}/${item.slug.current}`}>
            <div className='cursor-pointer grow2'>
                <div className='flex items-center justify-center relative'>
                    {imageUrl && (
                        <div className="square-container">
                            <img
                                src={imageUrl}
                                alt={item.name}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};



const Product = ({ products, categorySlug }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([...products]);
    const productsPerPage = 28;
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    const renderPageNumbers = () => {
        const pageButtons = [];

        // Always show the current page
        pageButtons.push(
            <button
                key={currentPage}
                className={`px-4 py-1 text-white text-[14px] rounded-md 
                    bg-primary`}
            >
                {currentPage}
            </button>
        );

        for (let i = 1; i <= 2; i++) {
            const nextPage = currentPage + i;
            if (nextPage <= totalPages - 1) {
                pageButtons.push(
                    <button
                        key={nextPage}
                        className={`px-4 py-1 text-white text-[14px] rounded-md 
                            ${currentPage === nextPage ? 'bg-primary' : 'bg-main3'}`}
                        onClick={() => setCurrentPage(nextPage)}
                    >
                        {nextPage}
                    </button>
                );
            }
        }

        if (currentPage + 2 < totalPages - 1) {
            // Show ellipsis if there are more pages
            pageButtons.push(<span key="ellipsis">...</span>);
        }

        // Always show the last page
        if (totalPages > 1) {
            pageButtons.push(
                <button
                    key={totalPages}
                    className={`px-4 py-1 text-white text-[14px] rounded-md 
                        ${currentPage === totalPages ? 'bg-primary' : 'bg-main3'}`}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };
  
    const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

    const updateFilteredProducts = useCallback((filtered) => {
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, []);
  

  return (
    <section className='relative w-full md:min-h-[500px] ss:min-h-[2000px] 
    min-h-[800px] mx-auto flex items-center'>
        <div className='max-w-[86rem] mx-auto flex flex-col w-full'>
            <div className="flex w-full items-center justify-between
            mb-6">
                <div className="flex-start flex gap-8 items-center">
                    <div className="flex gap-4 items-center cursor-pointer
                    bg-main2 rounded-md px-4 py-2.5 hover:bg-main3 navsmooth">
                        <img 
                            src={filter}
                            alt="filter"
                            className="w-4"
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
                            className="w-4"
                        />
                        <p className="text-main font-semibold text-[14px]">
                            Refresh results
                        </p>
                    </div>
                </div>

                <div className="flex-end flex gap-8 items-center">
                    <p className="text-main3 font-semibold text-[14px]">
                        {`${filteredProducts.length} results`}
                    </p>

                    <div className="flex gap-1 items-center">
                        <p className="text-main3 font-medium text-[14px]">
                            Showing:
                        </p>

                        <div className='relative flex items-center'>
                            <select
                                type="text"
                                className="py-1 px-2 mr-2
                                text-main cursor-pointer text-[14px] 
                                bg-transparent w-full custom-select
                                font-bold"
                            >
                                <option value="" disabled selected hidden>Most Popular</option>
                                <option value="social_media">Most Relevant</option>
                            </select>
                            <div className='absolute right-0'>
                                <TiArrowSortedDown 
                                    className='text-main text-[17px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full">
                <div className="flex w-1/4">
                    <Filter 
                        products={products} 
                        updateFilteredProducts={updateFilteredProducts} 
                    />
                </div>
                
                <div className="flex w-full flex-col">
                    <div className='grid md:gap-6 ss:gap-12 gap-8 
                    md:grid-cols-4'>
                        {currentProducts.map((item) => (
                            <ItemCard 
                                key={item._id}
                                item={item}
                                categorySlug={categorySlug}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end mt-8 items-center
                    gap-5">
                        <div
                            onClick={handlePreviousPage}
                            className='flex items-center gap-3
                            cursor-pointer'
                        >
                            <MdOutlineKeyboardArrowLeft 
                                className={`text-[25px] text-white p-1
                                rounded-lg font-semibold
                                ${currentPage === 1 
                                ? 'bg-main3' 
                                : 'bg-primary'}`}
                            />

                            <p className={`text-[14px]
                            ${currentPage === 1 
                                ? 'text-main3' 
                                : 'text-primary'}`}>
                                Previous
                            </p>
                        </div>

                        {renderPageNumbers()}

                        <div
                            onClick={handleNextPage}
                            className='flex items-center gap-3
                            cursor-pointer'
                        >
                            <p className={`text-[14px]
                            ${currentPage === 1 
                                ? 'text-main3' 
                                : 'text-primary'}`}>
                                Next
                            </p>

                            <MdOutlineKeyboardArrowRight
                                className={`text-[25px] text-white p-1
                                rounded-lg font-semibold
                                ${currentPage === 1 
                                ? 'bg-main3' 
                                : 'bg-primary'}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
};

export default SectionWrapper(Product, '');
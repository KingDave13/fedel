import { useState, useEffect, useCallback } from "react";
import { Filter } from '../features';
import { urlFor } from '../sanity';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { filter, refresh, whatsapplogo, gmaillogo } from "../assets";
import { SectionWrapper } from "../hoc";


const ItemCard = ({ item, categorySlug, attributes }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [showAttributes, setShowAttributes] = useState(false);
  
    useEffect(() => {
      if (item.images && item.images.length > 0) {
        const assetId = item.images[0].asset._ref;
        const imageUrl = urlFor(assetId).url();
        setImageUrl(imageUrl);
      }
    }, [item.images]);
  
    return (
      <Link to={`/products/${categorySlug}/${item.slug.current}`}>
        <div 
          className='relative cursor-pointer ' 
          onMouseEnter={() => setShowAttributes(true)} 
          onMouseLeave={() => setShowAttributes(false)}
        >
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

            <AnimatePresence>
                {showAttributes && (
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black bg-opacity-80 
                    p-4 rounded-lg flex flex-col">
                        <div className='text-white absolute bottom-4'>
                            <h3 className="text-[19px] font-bold mb-1">
                                {item.name}
                            </h3>

                            {attributes && attributes.map((attribute, index) => (
                                <div key={index} className='text-[13px] flex flex-col 
                                gap-0.5 mb-0.5'>
                                    {attribute.dimensions && <div>{attribute.dimensions}</div>}

                                    <div className="flex gap-2">
                                        {attribute.material && <div>{attribute.material}</div>} •
                                        {attribute.manufacturer && <div>{attribute.manufacturer}</div>}
                                    </div>
                                    
                                </div>
                            ))}

                            {attributes && attributes.map((attribute, index) => (
                                <div key={index}>
                                    {attribute.price !== null ? (
                                        <div className='flex gap-2 items-center'>
                                            {attribute.price && (
                                                <h1 
                                                className='text-greenBright text-[19px]
                                                font-bold'>
                                                    <div>
                                                        <span className='line-through'>
                                                            N
                                                        </span>
                                                        {attribute.price}.00
                                                    </div>
                                                </h1>
                                            )}
                                            
                                            {attribute.OriginalPrice && (
                                                <h1 className='text-main3 text-[14px]
                                                font-medium line-through'>
                                                    <div>
                                                        N{attribute.OriginalPrice}.00
                                                    </div>
                                                </h1>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-md px-3 py-1.5 flex 
                                        items-center gap-2 mt-2 justify-between">
                                            <p className="text-primary font-bold
                                            text-[14px]">
                                                REQUEST PRICE
                                            </p>

                                            <img src={gmaillogo}
                                                alt="gmail"
                                                className="w-5 h-auto" 
                                            />

                                            <img src={whatsapplogo}
                                                alt="whatsapp"
                                                className="w-4 h-auto" 
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="text-[12px] text-white mt-1.5">
                                Click for more details &rarr;
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </Link>
    );
};


const Product = ({ products, categorySlug }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([...products]);
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    const productsPerPage = 28;
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    const toggleFilterVisibility = () => {
        setIsFilterVisible(prev => !prev);
    };

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
                    <div className={`${isFilterVisible ? 'bg-main3' 
                    : 'bg-main2'}
                    flex gap-4 items-center cursor-pointer rounded-md 
                    px-4 py-2.5 hover:bg-main3 navsmooth`}
                    onClick={toggleFilterVisibility}
                    >
                        <img 
                            src={filter}
                            alt="filter"
                            className="w-4"
                        />
                        <p className="text-main font-semibold text-[14px]">
                            Filters
                        </p>
                    </div>

                    <div className="flex gap-3 items-center cursor-pointer"
                        onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'rotate(270deg)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'rotate(0deg)'}
                    >
                        <img 
                            src={refresh}
                            alt="refresh"
                            className="w-4 transition-transform duration-300"
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
                {isFilterVisible && (
                    <div className="flex w-1/4">
                        <Filter 
                            products={products} 
                            updateFilteredProducts={updateFilteredProducts} 
                        />
                    </div>
                )}
                
                <div className="flex w-full flex-col">
                    <div className='grid md:gap-6 ss:gap-12 gap-8 
                    md:grid-cols-4'>
                        {currentProducts.map((item) => (
                            <ItemCard 
                                key={item._id}
                                item={item}
                                categorySlug={categorySlug}
                                attributes={item.attributes}
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
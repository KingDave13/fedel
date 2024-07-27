import { motion, AnimatePresence } from 'framer-motion';
import { filter } from '../assets';

const FilterModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center
                bg-black bg-opacity-80 z-50">
                    <motion.div 
                    initial={{ y: 0, opacity: 0.7 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="bg-white padphone rounded-md
                    shadow-xl flex flex-col ss:justify-center 
                    w-full ss:h-auto h-[75%] overflow-auto 
                    items-center relative ss:m-16 m-6">
                        <div className='flex bg-main2 w-full 
                        top-0 ss:p-8 p-4 items-center gap-4 phone3'>
                            <img 
                                src={filter}
                                alt="filter"
                                className="w-5"
                            />
                            <p className="text-main font-bold
                            ss:text-[16px] text-[15px]">
                                Filters
                            </p>
                        </div>

                        <div className='ss:p-8 p-4 w-full'>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
  };

  export default FilterModal;
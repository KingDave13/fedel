import { motion, AnimatePresence } from 'framer-motion';

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
                        className="bg-white ss:p-8 p-4 padphone rounded-2xl 
                        shadow-xl flex flex-col ss:justify-center 
                        w-full ss:h-auto h-[80%] overflow-auto 
                        items-center relative ss:m-16 m-6">
                            {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
  };

  export default FilterModal;
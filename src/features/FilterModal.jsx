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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              className="bg-white p-6 rounded-md"
            >
              <button onClick={onClose} className="absolute top-2 right-2">
                Close
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  export default FilterModal;
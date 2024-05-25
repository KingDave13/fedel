import { motion } from 'framer-motion';
import styles from '../styles';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) => function HOC(props) {
    return (
        <motion.section
            variants={staggerContainer()}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className={`max-w-[86rem] mx-auto`}
        >
            <Component {...props}/>
        </motion.section>
    )
};

export default SectionWrapper;
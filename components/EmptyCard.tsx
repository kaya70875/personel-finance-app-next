import Image from 'next/image';
import './styles/_EmptyCard.scss';
import emptyImg from '@public/assets/images/empty.png';
import { motion } from 'framer-motion';

export default function EmptyCard() {
  return (
    <motion.div 
      className="empty-cards-wrapper"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
        <motion.div 
          className="empty-image-wrapper"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
            <Image
                src={emptyImg}
                alt="empty"
                className='empty-image'
            />
        </motion.div>
        <motion.div 
          className="empty-message"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
            <h3>There is Nothing here.</h3>
            <p>Add a new transaction or budget to get started.</p>
        </motion.div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 30, className = '', once = true, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.95, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

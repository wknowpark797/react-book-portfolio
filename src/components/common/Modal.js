import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [IsOpen, setIsOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { open: () => setIsOpen(true) };
	});

	useEffect(() => {
		IsOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [IsOpen]);

	return (
		<AnimatePresence>
			{IsOpen && (
				<motion.aside
					className='pop-wrap'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.2 } }}
				>
					<motion.div
						className='inner-pop'
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
						exit={{ opacity: 0, y: 100, transition: { duration: 0.3, delay: 0 } }}
					>
						<div className='inner-content'>{props.children}</div>

						<motion.button
							type='button'
							className='pop-close'
							onClick={() => setIsOpen(false)}
							initial={{ scale: 0 }}
							animate={{ scale: 1, transition: { duration: 0.2, delay: 0.5 } }}
							exit={{ scale: 0, transition: { duration: 0.2, delay: 0 } }}
						>
							<FontAwesomeIcon icon={faCircleXmark} />
						</motion.button>
					</motion.div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;

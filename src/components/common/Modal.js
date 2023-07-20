import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import loaderLottie from '../../asset/lottie/loaderLottie.json';

const Modal = forwardRef((props, ref) => {
	const frame = useRef(null);
	const counter = useRef(0);
	const [Loader, setLoader] = useState(true);
	const [IsOpen, setIsOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setIsOpen(true) };
	});

	useEffect(() => {
		if (IsOpen) {
			counter.current = 0;
			setLoader(true);
			frame.current.classList.remove('on');

			const imgs = frame.current.querySelectorAll('img');

			if (imgs.length === 0) {
				setLoader(false);
				frame.current.classList.add('on');
				return;
			}

			imgs.forEach((img) => {
				img.onload = () => {
					++counter.current;

					if (counter.current === imgs.length) {
						setLoader(false);
						frame.current.classList.add('on');
					}
				};
			});
		}
	}, [props, IsOpen]);

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
						<div className='inner-content' ref={frame}>
							{props.children}
						</div>
						{Loader && (
							<div className='loading-wrap'>
								<Lottie animationData={loaderLottie} className='lottie-wrap' />
								<p>LOADING...</p>
							</div>
						)}

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

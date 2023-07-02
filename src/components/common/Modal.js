import { useState, forwardRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = forwardRef((props, ref) => {
	const [IsOpen, setIsOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { open: () => setIsOpen(true) };
	});

	return (
		<>
			{IsOpen && (
				<aside ref={ref} className='pop-wrap'>
					<div className='inner-pop'>
						<div className='inner-content'>{props.children}</div>

						<button type='button' className='pop-close' onClick={() => setIsOpen(false)}>
							<FontAwesomeIcon icon={faCircleXmark} />
						</button>
					</div>
				</aside>
			)}
		</>
	);
});

export default Modal;

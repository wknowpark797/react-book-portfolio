import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function BtnTop() {
	const [IsShow, setIsShow] = useState(false);

	const moveTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const activation = () => {
		const scroll = window.scrollY;
		const limit = window.innerHeight / 2;

		scroll > limit ? setIsShow(true) : setIsShow(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('scroll', activation);
		};
	}, []);

	return (
		<>
			{IsShow && (
				<button type='button' id='btnTop' className='btn-top' onClick={moveTop}>
					<FontAwesomeIcon icon={faChevronUp} />
					<span>TOP</span>
				</button>
			)}
		</>
	);
}

export default BtnTop;

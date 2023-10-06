import { useState, useEffect, useRef } from 'react';
import { useThrottle } from '../../hooks/useThrottle';

function ScrollNavi() {
	const scrollNavi = useRef(null);
	const position = useRef([]); // 각 section의 offset값
	const [NaviLength, setNaviLength] = useState(0);
	const [Mounted, setMounted] = useState(true);

	const getPosition = () => {
		position.current = [];
		const sections = scrollNavi.current?.parentElement.querySelectorAll('.my-scroll');

		sections?.forEach((section) => {
			position.current.push(section.offsetTop);
		});

		setNaviLength(position.current.length);
	};

	const activation = () => {
		const limit = -window.innerHeight / 2;
		const scroll = window.scrollY; // 현재 스크롤 위치
		const naviArr = scrollNavi.current?.children;
		const sections = scrollNavi.current?.parentElement.querySelectorAll('.my-scroll');

		if (scroll <= 500) {
			for (const section of sections) section.classList.remove('on');
		}

		position.current.forEach((pos, idx) => {
			if (!naviArr) return;

			if (scroll >= pos + limit) {
				for (const navi of naviArr) navi.classList.remove('on');
				naviArr[idx].classList.add('on');

				sections[idx].classList.add('on');
			}
		});
	};

	// Throttle 적용
	const getPositionThrottle = useThrottle(getPosition);
	const activationThrottle = useThrottle(activation);

	useEffect(() => {
		setTimeout(() => {
			Mounted && getPosition();
		}, 1500);

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		window.addEventListener('resize', getPositionThrottle);
		window.addEventListener('scroll', activationThrottle);

		return () => {
			window.removeEventListener('resize', getPositionThrottle);
			window.removeEventListener('scroll', activationThrottle);
			setMounted(false);
		};
	}, [Mounted, getPositionThrottle, activationThrottle]);

	return (
		<ul className='scroll-navi' ref={scrollNavi}>
			{Array(NaviLength)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';

					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								window.scrollTo({
									top: position.current[idx],
									behavior: 'smooth',
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default ScrollNavi;

import { useState, useEffect, useRef } from 'react';

function ScrollNavi() {
	const scrollNavi = useRef(null);
	const position = useRef([]); // 각 section의 offset값
	const [NaviLength, setNaviLength] = useState(0);

	// TODO: api로 불러오는 컨텐츠에 의해 높이값이 제대로 생성되지 않았을때의 section offset값 때문에 정확한 위치값을 잡지 못하는 문제 발생
	const getPosition = () => {
		position.current = [];
		const sections = scrollNavi.current.parentElement.querySelectorAll('.my-scroll');

		for (const section of sections) {
			position.current.push(section.offsetTop);
		}

		setNaviLength(position.current.length);
	};

	const activation = () => {
		const limit = -200;
		const scroll = window.scrollY; // 현재 스크롤 위치
		const naviArr = scrollNavi.current.children;
		const sections = scrollNavi.current.parentElement.querySelectorAll('.my-scroll');

		if (scroll <= 500) {
			for (const section of sections) section.classList.remove('on');
		}

		position.current.forEach((pos, idx) => {
			if (scroll >= pos + limit) {
				for (const navi of naviArr) navi.classList.remove('on');
				naviArr[idx].classList.add('on');

				sections[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPosition();

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		window.addEventListener('resize', getPosition);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('resize', getPosition);
			window.removeEventListener('scroll', activation);
		};
	}, []);

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
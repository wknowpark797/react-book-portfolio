function MainGallery() {
	return (
		<section id='main-gallery' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Gallery</h1>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
				</div>

				<div className='box-wrap'>
					<div className='inner-box'>
						<article className='bookImg1'>
							<div className='img-box'>
								<img
									src={`${process.env.PUBLIC_URL}/image/gallery_book1.jpg`}
									alt=''
								/>
							</div>
						</article>

						<div className='flex-box'>
							<article className='bookImg2'>
								<div className='img-box'>
									<img
										src={`${process.env.PUBLIC_URL}/image/gallery_book2.jpg`}
										alt=''
									/>
								</div>
							</article>
							<article className='bookImg3'>
								<div className='img-box'>
									<img
										src={`${process.env.PUBLIC_URL}/image/gallery_book3.jpg`}
										alt=''
									/>
								</div>
							</article>
						</div>
					</div>

					<div className='inner-box'>
						<article className='bookImg4'>
							<div className='img-box'>
								<img
									src={`${process.env.PUBLIC_URL}/image/gallery_book5.jpg`}
									alt=''
								/>
							</div>
						</article>
					</div>

					<div className='inner-box'>
						<article className='bookImg5'>
							<div className='img-box'>
								<img
									src={`${process.env.PUBLIC_URL}/image/gallery_book4.jpg`}
									alt=''
								/>
							</div>
						</article>
						<article className='bookImg6'>
							<div className='img-box'>
								<img
									src={`${process.env.PUBLIC_URL}/image/gallery_book6.jpg`}
									alt=''
								/>
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MainGallery;

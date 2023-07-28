function Signin() {
	return (
		<section className='sign-in'>
			<div className='inner-container'>
				<div className='signin-box'>
					<div className='top-wrap'>
						<h1>Sign In</h1>
					</div>

					<form id='formSignin' className='form-signin'>
						<fieldset>
							<legend className='h'>로그인 form 입력 항목</legend>

							{/* Email */}
							<div className='input-box'>
								<label htmlFor='email' className='tit'>
									E-mail
								</label>
								<input type='text' name='email' id='email' placeholder='이메일 주소를 입력하세요.' />
							</div>

							{/* password */}
							<div className='input-box'>
								<label htmlFor='pwd' className='tit'>
									Password
								</label>
								<input type='password' name='pwd' id='pwd' placeholder='비밀번호를 입력하세요.' />
							</div>

							<div className='btn-wrap'>
								<input type='submit' value='SIGN IN' />
								<button>SIGN UP</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Signin;

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faOptinMonster,
	faEarlybirds,
	faFacebookF,
	faGooglePlusG,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {
	const history = useHistory();

	const selectEl = useRef(null);
	const radioGroup = useRef(null);
	const checkGroup = useRef(null);

	const initValue = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		edu: '',
		gender: '',
		hobby: [],
		comments: '',
	};
	const [Value, setValue] = useState(initValue);
	const [Errors, setErrors] = useState({});
	const [Submit, setSubmit] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		const errLength = Object.keys(Errors).length;
		if (errLength === 0 && Submit) {
			alert('모든 인증을 통과하였습니다.');
			// history.push('/signin');
			resetForm();
		}
	}, [Errors]);

	const resetForm = () => {
		const select = selectEl.current.options[0];
		const radios = radioGroup.current.querySelectorAll('input');
		const checks = checkGroup.current.querySelectorAll('input');

		select.selected = true;
		radios.forEach((el) => (el.checked = false));
		checks.forEach((el) => (el.checked = false));
		setValue(initValue);
	};

	const checkValid = (value) => {
		const errors = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errors.userid = '아이디는 5글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 4 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errors.pwd1 = '비밀번호는 4글자 이상, 특수문자와 영문자 그리고 숫자를 포함하여 입력하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errors.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errors.email = '이메일주소는 @를 포함하여 8글자 이상 입력하세요.';
		}
		if (value.edu === '') {
			errors.edu = '최종학력을 선택하세요.';
		}
		if (value.gender === '') {
			errors.gender = '성별을 선택하세요.';
		}
		if (value.hobby.length === 0) {
			errors.hobby = '관심사를 하나 이상 선택하세요.';
		}
		if (value.comments.length < 10) {
			errors.comments = '남기는 글은 10글자 이상 입력하세요.';
		}

		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(checkValid(Value));
		setSubmit(true);
	};

	const changeInput = (e) => {
		const { name, value } = e.target;
		setValue({ ...Value, [name]: value });
	};

	const changeSelect = (e) => {
		const { name, value } = e.target;
		setValue({ ...Value, [name]: value });
	};

	const changeRadio = (e) => {
		const { name, value } = e.target;
		setValue({ ...Value, [name]: value });
	};

	const changeCheck = (e) => {
		const { name } = e.target;
		const inputs = e.target.closest('.check-wrap').querySelectorAll('input');

		let checkArr = [];
		inputs.forEach((input) => {
			if (input.checked) checkArr.push(input.value);
		});

		setValue({ ...Value, [name]: checkArr });
	};

	return (
		<section className='sign-up'>
			<div className='inner-container'>
				<div className='desc-wrap'>
					<div className='title-wrap'>
						<h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
						<p>
							<span>DETAIL DESCRIPTION</span>
						</p>
					</div>

					<div className='change-wrap'>
						<ul className='guideListWrap'>
							<li>회원가입을 위한 입력 항목입니다.</li>
							<li>입력 항목에 커서를 올리면 안내사항이 표시됩니다.</li>
						</ul>
					</div>

					<ul className='list-notice'>
						<li>
							<FontAwesomeIcon icon={faOptinMonster} />
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem dolores perferendis asperiores.
							</p>
						</li>
						<li>
							<FontAwesomeIcon icon={faEarlybirds} />
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem dolores perferendis asperiores.
							</p>
						</li>
					</ul>
				</div>

				<div className='signup-box'>
					<div className='top-wrap'>
						<h1>Create Account</h1>

						<div className='sns-wrap'>
							<Link to='#'>
								<FontAwesomeIcon icon={faFacebookF} />
							</Link>
							<Link to='#'>
								<FontAwesomeIcon icon={faGooglePlusG} />
							</Link>
							<Link to='#'>
								<FontAwesomeIcon icon={faLinkedinIn} />
							</Link>
						</div>

						<p>or use your email for registration:</p>
					</div>

					<form id='formSignup' className='form-signup' onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>회원가입 form 입력 항목</legend>

							{/* user id */}
							<div className='input-box'>
								<label htmlFor='userid' className='tit'>
									User ID
								</label>
								<input
									type='text'
									name='userid'
									id='userid'
									placeholder='아이디를 입력하세요.'
									onChange={changeInput}
									value={Value.userid}
								/>

								{Errors.userid && <p className='error'>{Errors.userid}</p>}
							</div>

							{/* password */}
							<div className='input-box'>
								<label htmlFor='pwd1' className='tit'>
									Password
								</label>
								<input
									type='password'
									name='pwd1'
									id='pwd1'
									placeholder='비밀번호를 입력하세요.'
									onChange={changeInput}
									value={Value.pwd1}
								/>

								{Errors.pwd1 && <p className='error'>{Errors.pwd1}</p>}
							</div>

							<div className='input-box'>
								<label htmlFor='pwd2' className='tit'>
									Re Passsword
								</label>
								<input
									type='password'
									name='pwd2'
									id='pwd2'
									placeholder='비밀번호를 재 입력하세요.'
									onChange={changeInput}
									value={Value.pwd2}
								/>

								{Errors.pwd2 && <p className='error'>{Errors.pwd2}</p>}
							</div>

							{/* Email */}
							<div className='input-box'>
								<label htmlFor='email' className='tit'>
									E-mail
								</label>
								<input
									type='text'
									name='email'
									id='email'
									placeholder='이메일 주소를 입력하세요.'
									onChange={changeInput}
									value={Value.email}
								/>

								{Errors.email && <p className='error'>{Errors.email}</p>}
							</div>

							{/* Education */}
							<div className='input-box'>
								<label htmlFor='edu' className='tit'>
									Education
								</label>

								<select name='edu' id='edu' onChange={changeSelect} ref={selectEl}>
									<option value=''>최종학력을 선택해주세요.</option>
									<option value='elementary school'>초등학교 졸업</option>
									<option value='middle school'>중학교 졸업</option>
									<option value='high school'>고등학교 졸업</option>
									<option value='college'>대학교 졸업</option>
								</select>

								{Errors.edu && <p className='error'>{Errors.edu}</p>}
							</div>

							{/* Gender */}
							<div className='input-box'>
								<p className='tit'>Gender</p>

								<div className='radio-wrap' ref={radioGroup}>
									<div>
										<input type='radio' name='gender' id='male' value='male' onChange={changeRadio} />
										<label htmlFor='male'>Male</label>
									</div>

									<div>
										<input type='radio' name='gender' id='female' value='female' onChange={changeRadio} />
										<label htmlFor='female'>Female</label>
									</div>
								</div>

								{Errors.gender && <p className='error'>{Errors.gender}</p>}
							</div>

							{/* Interests */}
							<div className='input-box'>
								<p className='tit'>Interests</p>

								<div className='check-wrap' ref={checkGroup}>
									<div>
										<input type='checkbox' name='hobby' id='sports' value='sports' onChange={changeCheck} />
										<label htmlFor='sports'>Sports</label>
									</div>

									<div>
										<input type='checkbox' name='hobby' id='music' value='music' onChange={changeCheck} />
										<label htmlFor='music'>Music</label>
									</div>

									<div>
										<input type='checkbox' name='hobby' id='game' value='game' onChange={changeCheck} />
										<label htmlFor='game'>Game</label>
									</div>

									<div>
										<input type='checkbox' name='hobby' id='reading' value='reading' onChange={changeCheck} />
										<label htmlFor='reading'>Reading</label>
									</div>
								</div>

								{Errors.hobby && <p className='error'>{Errors.hobby}</p>}
							</div>

							{/* Comments */}
							<div className='input-box'>
								<label htmlFor='comments' className='tit'>
									Comments
								</label>
								<textarea
									name='comments'
									id='comments'
									cols='30'
									rows='7'
									placeholder='남기는 글을 입력하세요.'
									onChange={changeInput}
									value={Value.comments}
								></textarea>

								{Errors.comments && <p className='error'>{Errors.comments}</p>}
							</div>

							<div className='btn-wrap'>
								<input type='reset' value='RESET' onClick={() => setValue(initValue)} />
								<input type='submit' value='SIGN UP' />
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Signup;

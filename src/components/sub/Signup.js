import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faOptinMonster,
	faEarlybirds,
	faFacebookF,
	faGooglePlusG,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../firebase';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';

function Signup() {
	const history = useHistory();
	const Uid = useSelector((store) => store.userInfoReducer.userInfo.uid);

	const initGuide = [
		'회원가입을 위한 입력 항목입니다.',
		'입력 항목에 커서를 올리면 안내사항이 표시됩니다.',
	];
	const initValue = useMemo(() => {
		return {
			username: '',
			pwd1: '',
			pwd2: '',
			email: '',

			// edu: '',
			// gender: '',
			// hobby: [],
			// comments: '',
		};
	}, []);
	const selectEl = useRef(null);
	const radioGroup = useRef(null);
	const checkGroup = useRef(null);
	const [Value, setValue] = useState(initValue);
	const [Errors, setErrors] = useState({});
	const [Submit, setSubmit] = useState(false);
	const [GuideList, setGuideList] = useState(initGuide);

	const debouncedVal = useDebounce(Value);

	const showError = useCallback(() => {
		setErrors(checkValid(debouncedVal));
	}, [debouncedVal]);

	const handleJoin = useCallback(async () => {
		// firebase에 이메일, 비밀번호 등록
		const createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(Value.email, Value.pwd1);
		await createdUser.user.updateProfile({ displayName: Value.username });

		// 몽고DB에 저장
		const item = {
			uid: createdUser.user.multiFactor.user.uid,
			displayName: createdUser.user.multiFactor.user.displayName,
		};
		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				firebase.auth().signOut();
				alert(
					'회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.'
				);
				history.push('/signin');
			} else {
				return alert('회원가입에 실패했습니다.');
			}
		});
	}, [Value, history]);

	const resetForm = useCallback(() => {
		const select = selectEl.current.options[0];
		const radios = radioGroup.current.querySelectorAll('input');
		const checks = checkGroup.current.querySelectorAll('input');

		select.selected = true;
		radios.forEach((el) => (el.checked = false));
		checks.forEach((el) => (el.checked = false));
		setValue(initValue);
	}, [initValue]);

	const checkValid = (value) => {
		const errors = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.username.length < 3) {
			errors.username = '사용할 이름은 3글자 이상 입력하세요.';
		}
		if (
			value.pwd1.length < 4 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errors.pwd1 =
				'비밀번호는 4글자 이상, 특수문자와 영문자 그리고 숫자를 포함하여 입력하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errors.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errors.email = '이메일주소는 @를 포함하여 8글자 이상 입력하세요.';
		}

		/*
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
		*/

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

	useEffect(() => {
		showError();
	}, [debouncedVal, showError]);

	useEffect(() => {
		const errLength = Object.keys(Errors).length;

		if (errLength === 0 && Submit) {
			handleJoin();
			setSubmit(false);
			// resetForm();
		}
	}, [Errors, Submit, handleJoin]);

	useEffect(() => {
		if (Uid) history.push('/');
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [history, Uid]);

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
							{GuideList.map((guide, idx) => {
								return <li key={idx}>{guide}</li>;
							})}
						</ul>
					</div>

					<ul className='list-notice'>
						<li>
							<FontAwesomeIcon icon={faOptinMonster} />
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Exercitationem dolores perferendis asperiores.
							</p>
						</li>
						<li>
							<FontAwesomeIcon icon={faEarlybirds} />
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Exercitationem dolores perferendis asperiores.
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
									onFocus={() => {
										setGuideList([
											'이메일 입력 항목 입니다.',
											'입력 항목에 @를 포함하여 입력하세요.',
											'@ 앞쪽과 뒤쪽에 문자를 입력하세요.',
											'@ 뒤쪽의 서비스명을 올바르게 입력하세요.',
										]);
									}}
									onBlur={() => {
										setGuideList(initGuide);
									}}
								/>

								{Errors.email && <p className='error'>{Errors.email}</p>}
							</div>

							{/* user name */}
							<div className='input-box'>
								<label htmlFor='username' className='tit'>
									User Name
								</label>
								<input
									type='text'
									name='username'
									id='username'
									placeholder='사용할 이름을 입력하세요.'
									onChange={changeInput}
									value={Value.username}
									onFocus={() => {
										setGuideList([
											'사용할 이름 입력 항목 입니다.',
											'입력 항목에 3글자 이상 입력하세요.',
										]);
									}}
									onBlur={() => {
										setGuideList(initGuide);
									}}
								/>

								{Errors.username && <p className='error'>{Errors.username}</p>}
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
									onFocus={() => {
										setGuideList([
											'비밀번호 입력 항목 입니다.',
											'입력 항목에 4글자 이상 입력하세요.',
											'특수문자와 영문자 그리고 숫자를 포함하여 입력하세요.',
										]);
									}}
									onBlur={() => {
										setGuideList(initGuide);
									}}
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
									onFocus={() => {
										setGuideList([
											'비밀번호 입력 항목 입니다.',
											'입력 항목에 4글자 이상 입력하세요.',
											'특수문자와 영문자 그리고 숫자를 포함하여 입력하세요.',
										]);
									}}
									onBlur={() => {
										setGuideList(initGuide);
									}}
								/>

								{Errors.pwd2 && <p className='error'>{Errors.pwd2}</p>}
							</div>

							{/* Education */}
							{/* <div className='input-box'>
								<label htmlFor='edu' className='tit'>
									Education
								</label>

								<select
									name='edu'
									id='edu'
									onChange={changeSelect}
									ref={selectEl}
									onFocus={() => {
										setGuideList(['최종학력 선택 항목 입니다.', '최종학력을 선택하세요.']);
									}}
									onBlur={() => {
										setGuideList(initGuide);
									}}
								>
									<option value=''>최종학력을 선택해주세요.</option>
									<option value='elementary school'>초등학교 졸업</option>
									<option value='middle school'>중학교 졸업</option>
									<option value='high school'>고등학교 졸업</option>
									<option value='college'>대학교 졸업</option>
								</select>

								{Errors.edu && <p className='error'>{Errors.edu}</p>}
							</div> */}

							{/* Gender */}
							{/* <div className='input-box'>
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
							</div> */}

							{/* Interests */}
							{/* <div className='input-box'>
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
							</div> */}

							{/* Comments */}
							{/* <div className='input-box'>
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
									onFocus={() => {
										setGuideList(['남기는 글 입력 항목 입니다.', '입력 항목에 10글자 이상 입력하세요.']);
									}}
									onBlur={() => {
										setGuideList(initGuide);
									}}
								></textarea>

								{Errors.comments && <p className='error'>{Errors.comments}</p>}
							</div> */}

							<div className='btn-wrap'>
								<input
									type='reset'
									value='RESET'
									onClick={() => setValue(initValue)}
								/>
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

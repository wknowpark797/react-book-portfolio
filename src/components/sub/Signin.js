import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useGlobalData } from '../../hooks/useGlobalContext';
import firebase from '../../firebase';

function Signin() {
	const history = useHistory();
	const { Uid } = useGlobalData();

	const initValue = {
		email: '',
		pwd: '',
	};
	const [Value, setValue] = useState(initValue);
	const [Errors, setErrors] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleLogin = useCallback(async () => {
		try {
			await firebase.auth().signInWithEmailAndPassword(Value.email, Value.pwd);
			alert('로그인 완료되었습니다.');
			history.push('/');
		} catch (err) {
			if (err.code === 'auth/user-not-found') alert('존재하지 않는 이메일입니다.');
			else if (err.code === 'auth/wrong-password') alert('비밀번호가 일치하지 않습니다.');
			else alert('로그인에 실패했습니다.');
		}
	}, [Value, history]);

	const checkValid = (value) => {
		const errors = {};

		if (value.email.length < 1 || !/@/.test(value.email)) {
			errors.email = '이메일 주소는 @를 포함하여 입력하세요.';
		}
		if (value.pwd.length < 1) {
			errors.pwd = '비밀번호를 입력하세요.';
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

	useEffect(() => {
		const errLength = Object.keys(Errors).length;

		if (errLength === 0 && Submit) {
			handleLogin();
			setSubmit(false);
		}
	}, [Errors, Submit, handleLogin]);

	useEffect(() => {
		if (Uid) history.push('/');
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [history, Uid]);

	return (
		<section className='sign-in'>
			<div className='inner-container'>
				<div className='signin-box'>
					<div className='top-wrap'>
						<h1>Sign In</h1>
					</div>

					<form id='formSignin' className='form-signin' onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>로그인 form 입력 항목</legend>

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
									value={Value.email}
									onChange={changeInput}
								/>

								{Errors.email && <p className='error'>{Errors.email}</p>}
							</div>

							{/* password */}
							<div className='input-box'>
								<label htmlFor='pwd' className='tit'>
									Password
								</label>
								<input
									type='password'
									name='pwd'
									id='pwd'
									placeholder='비밀번호를 입력하세요.'
									value={Value.pwd}
									onChange={changeInput}
								/>

								{Errors.pwd && <p className='error'>{Errors.pwd}</p>}
							</div>

							<div className='btn-wrap'>
								<input type='submit' value='SIGN IN' />
								<Link to='/signup'>SIGN UP</Link>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Signin;

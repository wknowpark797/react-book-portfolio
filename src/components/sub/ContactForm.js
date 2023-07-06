import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactForm() {
	const initValue = {
		username: '',
		email: '',
		message: '',
	};
	const form = useRef(null);
	const [Value, setValue] = useState(initValue);
	const [Errors, setErrors] = useState({});
	const [Submit, setSubmit] = useState(false); // Errors로 인한 인증통과 로직 자동 실행 방지

	useEffect(() => {
		const errLength = Object.keys(Errors).length;

		if (errLength === 0 && Submit) {
			const serviceId = 'service_9gz6979';
			const templateId = 'template_p22mw5k';
			const publidKey = 'jupOkSJY9CbSbfcLR';

			emailjs.sendForm(serviceId, templateId, form.current, publidKey).then(
				(result) => {
					console.log(result.text);
					alert('메일이 성공적으로 발송되었습니다.');
					setValue(initValue);
				},
				(error) => {
					console.log(error.text);
				}
			);
		}
	}, [Errors]);

	const checkValid = (value) => {
		const errors = {};

		if (value.username.length < 2) {
			errors.username = '이름은 2글자 이상 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errors.email = '이메일주소는 @를 포함하여 8글자 이상 입력하세요.';
		}
		if (value.message.length < 10) {
			errors.message = '문의사항은 10글자 이상 입력하세요.';
		}

		return errors;
	};

	const sendEmail = (e) => {
		e.preventDefault();
		setErrors(checkValid(Value));
		setSubmit(true);
	};

	const changeInput = (e) => {
		const { name, value } = e.target;
		setValue({ ...Value, [name]: value });
	};

	return (
		<>
			<form ref={form} id='formContact' className='form-contact' onSubmit={sendEmail}>
				<div className='input-box'>
					<label htmlFor='username' className='tit'>
						Name
					</label>
					<input type='text' name='username' id='username' placeholder='이름을 입력하세요.' onChange={changeInput} value={Value.username} />

					{Errors.username && <p className='error'>{Errors.username}</p>}
				</div>

				<div className='input-box'>
					<label htmlFor='email' className='tit'>
						E-mail
					</label>
					<input type='text' name='email' id='email' placeholder='이메일 주소를 입력하세요.' onChange={changeInput} value={Value.email} />

					{Errors.email && <p className='error'>{Errors.email}</p>}
				</div>

				<div className='input-box msg-box'>
					<label htmlFor='message' className='tit'>
						Message
					</label>
					<textarea name='message' id='message' placeholder='문의사항을 입력하세요.' onChange={changeInput} value={Value.message}></textarea>

					{Errors.message && <p className='error'>{Errors.message}</p>}
				</div>

				<div className='btn-wrap'>
					<input type='submit' value='SEND' />
				</div>
			</form>
		</>
	);
}

export default ContactForm;

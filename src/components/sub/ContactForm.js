import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactForm() {
	const form = useRef(null);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const inputMessage = useRef(null);
	const [Success, setSuccess] = useState(false);

	const sendEmail = (e) => {
		e.preventDefault();

		const serviceId = 'service_9gz6979';
		const templateId = 'template_p22mw5k';
		const publidKey = 'jupOkSJY9CbSbfcLR';

		emailjs.sendForm(serviceId, templateId, form.current, publidKey).then(
			(result) => {
				console.log(result.text);
				setSuccess(true);
				inputName.current.value = '';
				inputEmail.current.value = '';
				inputMessage.current.value = '';
			},
			(error) => {
				console.log(error.text);
				setSuccess(false);
			}
		);
	};

	return (
		<>
			<form ref={form} id='formContact' className='form-contact' onSubmit={sendEmail}>
				<div className='input-box'>
					<label for='username' className='tit'>
						Name
					</label>
					<input type='text' name='username' ref={inputName} id='username' placeholder='이름을 입력하세요.' />
				</div>

				<div className='input-box'>
					<label for='email' className='tit'>
						E-mail
					</label>
					<input type='email' name='email' ref={inputEmail} id='email' placeholder='이메일 주소를 입력하세요.' />
				</div>

				<div className='input-box msg-box'>
					<label for='message' className='tit'>
						Message
					</label>
					<textarea name='message' ref={inputMessage} id='message' placeholder='문의사항을 입력하세요.'></textarea>
				</div>

				<div className='btn-wrap'>
					<input type='submit' value='SEND' />
				</div>
			</form>

			{Success && <p>메일이 성공적으로 발송되었습니다.</p>}
		</>
	);
}

export default ContactForm;

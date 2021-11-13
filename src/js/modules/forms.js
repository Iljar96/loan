export default class Forms {
	constructor(form) {
		this.form = document.querySelectorAll(form);
		this.inputs = document.querySelectorAll('input, textarea');
		this.message = {
			loading: 'Загрузка...',
			success: 'Спасибо! С вами скоро свяжемся',
			failure: 'Что-то пошло не так...',
			spinner: 'assets/img/spinner.gif',
			ok: 'assets/img/ok.png',
			fail: 'assets/img/fail.png'
		};
		this.path = 'assets/mail.php';
	}

	clearInputs() {
		this.inputs.forEach(input => input.value = '');
	}

	async postData(url, data) {
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll('[type="email"]');

		mailInputs.forEach(input => {
			input.addEventListener('keypress', function (e) {
				//Только латиница, цифры и .
				if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
					// input.setAttribute('readonly ', 'true');
					e.preventDefault();
				}
			});
		});
	}

	initMask() {

		let setCursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();

				range.collapse(true);
				range.moveStart('character', pos);
				range.moveEnd('character', pos);
				range.select();
			}
		};

		function createMask(event) {
			let matrix = '+1 (___) ___-____',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');
			if (def.length >= val.length) {
				val = def;
			}

			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
			});

			if (event.type === 'blur') {
				if (this.value.length == 2) {
					this.value = '';
				}
			} else {
				setCursorPosition(this.value.length, this);
			}
		}

		let inputs = document.querySelectorAll('[name="phone"]');

		inputs.forEach(input => {
			input.addEventListener('click', function (e) {
				// input.selectionStart = input.value.length;
				setCursorPosition(this.value.length, this);
			});
			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blur', createMask);
		});
	}

	init() {
		this.checkMailInputs();
		this.initMask();

		this.form.forEach(item => {
			item.addEventListener('submit', (e) => {
				e.preventDefault();

				if (item.parentNode.querySelector('.status')) {
					item.parentNode.querySelector('.status').remove();
				}

				let statusMessage = document.createElement('div');
				statusMessage.classList.add('status');
				item.parentNode.appendChild(statusMessage);

				let statusImg = document.createElement('img');
				statusImg.setAttribute('src', this.message.spinner);
				statusImg.classList.add('animated', 'faddeInUp');
				statusMessage.appendChild(statusImg);

				let textMessage = document.createElement('div');
				textMessage.textContent = this.message.loading;
				statusMessage.appendChild(textMessage);


				const formData = new FormData(item);

				this.postData(this.path, formData)
					.then(res => {
						console.log(res);
						statusImg.setAttribute('src', '');
						statusImg.setAttribute('src', this.message.ok);
						textMessage.textContent = this.message.success;
					})
					.catch(() => {
						textMessage.textContent = this.message.failure;
					})
					.finally(() => {
						this.clearInputs();
						setTimeout(function () {
							statusMessage.remove();
						}, 5000);
					});
			});
		});
	}

}
export default class Slider {
	constructor(page, btns) {
		this.page = document.querySelector(page);
		this.slides = this.page.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 1;
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		try {
			if (n === 3) {
				if (!this.hanson.classList.contains('showed')) {
					setTimeout(() => {
						this.hanson.classList.add('animated', 'slideInUp', 'showed');
						this.hanson.style.display = '';
					}, 3000);
				} else {
					this.hanson.classList.remove('animated', 'slideInUp');
				}
			}
		} catch (e) { }

		this.slides.forEach(slide => {
			slide.style.display = 'none';
			slide.classList.remove('animated', 'fadeIn');
		});

		this.slides[this.slideIndex - 1].style.display = '';
		this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
	}

	//Перемещение к следующему(n=1) / к предыдущему(n=-1) слайду
	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	render() {
		try {
			this.hanson = document.querySelector('.hanson');

			this.hanson.style.display = 'none';
		} catch (e) { }

		this.btns.forEach(btn => {
			btn.addEventListener('click', e => this.plusSlides(1));

			//Кнопка логотипа, по клику на 1 слайд
			btn.parentNode.previousElementSibling.addEventListener('click', e => {
				e.preventDefault();

				//Перемещение к указанному слайду
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		this.showSlides(this.slideIndex);
	}

}
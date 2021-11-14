//Получаем доступ к свойствам и методам при помощи super()

import Slider from './slider';

export default class MainSlider extends Slider {
	constructor(btns) {
		super(btns);
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

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', e => this.plusSlides(1));

			//Кнопка логотипа, по клику на 1 слайд
			btn.parentNode.previousElementSibling.addEventListener('click', e => {
				console.log(btn.parentNode);
				console.log(btn.parentNode.previousElementSibling);
				e.preventDefault();

				//Перемещение к указанному слайду
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		document.querySelectorAll('.prevmodule').forEach(item => {
			item.addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();

				this.plusSlides(-1);
			});
		});

		document.querySelectorAll('.nextmodule').forEach(item => {
			item.addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();

				this.plusSlides(1)
			});
		});
	}

	render() {
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');

				this.hanson.style.display = 'none';
			} catch (e) { }

			this.bindTriggers();

			this.showSlides(this.slideIndex);
		}
	}
}
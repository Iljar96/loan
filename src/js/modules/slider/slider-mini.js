import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(container, prev, next, activeClass, autoplay) {
		super(container, prev, next, activeClass, autoplay);
		this.autoPlayInterval;
	}

	decorizeSlides() {
		this.slides.forEach(slide => slide.classList.remove(this.activeClass));
		this.slides[0].classList.add(this.activeClass);
	}

	bindTriggers() {
		this.prev.addEventListener('click', e => {
			let active = this.slides[this.slides.length - 1];
			this.container.insertBefore(active, this.slides[0]);
			this.decorizeSlides();

			clearInterval(this.autoPlayInterval);
			this.startAutoSlide();
		});

		this.next.addEventListener('click', e => {
			this.nextSlide();

			clearInterval(this.autoPlayInterval);
			this.startAutoSlide();
		});
	}

	startAutoSlide() {
		this.autoPlayInterval = setInterval(() => {
			if (this.autoplay) {
				this.nextSlide();
			}
		}, 3000);
	}

	nextSlide() {
		this.container.appendChild(this.slides[0]);
		this.decorizeSlides();
	}

	init() {
		try {
			this.container.style.cssText = `
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			overflow: hidden;
		`;

			this.bindTriggers();
			this.decorizeSlides();

			this.startAutoSlide();

			this.container.addEventListener('mouseover', e => clearInterval(this.autoPlayInterval));
			this.container.addEventListener('mouseout', e => this.startAutoSlide());
		} catch (e) { }
	}
}
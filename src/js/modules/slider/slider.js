// = {} - на случай, если создаем экземпляр класса пез передачи объекта как настройки, и чтобы не было ошибки // btns = null - чтобы не выдавали ошибку если не заданы

export default class Slider {
	constructor({ container = null,
		btns = null,
		prev = null,
		next = null,
		activeClass = '',
		autoplay } = {}) {
		this.container = document.querySelector(container);
		this.slides = this.container.children;
		this.btns = document.querySelectorAll(btns);
		this.prev = document.querySelector(prev);
		this.next = document.querySelector(next);
		this.activeClass = activeClass;
		this.autoplay = autoplay;
		this.slideIndex = 2;
	}
}
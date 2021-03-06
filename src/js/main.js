import Accordeon from "./modules/accordeon";
import Difference from "./modules/difference";
import Download from "./modules/download";
import Forms from "./modules/forms";
import VideoPlayer from "./modules/playVideo";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";

window.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({ container: '.page', btns: ' .next' });
	slider.render();
	new MainSlider({ container: '.moduleapp', btns: '.next' }).render();

	const showupSlider = new MiniSlider({
		container: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		activeClass: 'card-active',
	});
	showupSlider.init();

	const modulesSlider = new MiniSlider({
		container: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		activeClass: 'card-active',
		autoplay: true
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		container: '.feed__slider-wrapper',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active',
	});
	feedSlider.init();

	new VideoPlayer('.showup .play', '.overlay').init();
	new VideoPlayer('.module__video .play', '.overlay').init();

	new Difference('.officerold', '.officernew', '.officer__card-item').init();

	new Forms('form').init();

	new Accordeon('.module__info-show').init();

	new Download('.download').init();
});
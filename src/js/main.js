import VideoPlayer from "./modules/playVideo";
import Slider from "./modules/slider";

window.addEventListener('DOMContentLoaded', () => {
	const slider = new Slider('.page', '.next');
	slider.render();

	const player1 = new VideoPlayer('.showup .play', '.overlay');
	player1.init();
});
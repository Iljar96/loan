//https://developers.google.com/youtube/iframe_api_reference?hl=ru#Getting_Started
//<div id="frame"></div> - блок вместо которого появится iframe (new YT.Player('frame') - frame jnnelf)
/* Popup
 <div class="overlay">
	<div class="video"><div id="frame"></div><div class="close">×</div></div>
</div> */
/* Trigger <div data-url="vZ4Sne0wdxY" class="play"></div> */

export default class VideoPlayer {
	constructor(triggers, overlay) {
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = document.querySelector('.close');
		this.iframeBlockID = 'frame';
	}

	createPlayer(url) {
		this.player = new YT.Player(this.iframeBlockID, {
			height: '100%',
			width: '100%',
			videoId: `${url}`,
			//События, которые можно првязывать к плееру
			events: {
				'onReady': this.onPlayerReady,
				// 'onStateChange': onPlayerStateChange
			}
		});

		this.overlay.classList.remove('fadeOut');
		this.overlay.classList.add('animated', 'fadeIn', 'show');
	}

	onPlayerReady(event) {
		event.target.playVideo();
	}

	bindCloseBtn() {
		this.close.addEventListener('click', e => {
			this.overlay.classList.remove('fadeIn', 'show');
			this.overlay.classList.add('fadeOut');
			this.player.stopVideo();
			this.player.destroy();
		});
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				const path = btn.dataset.url;
				this.createPlayer(path);
			});
		});
	}

	init() {
		//Асинхронное подключение JavaScript API проигрывателя IFrame
		const tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		this.bindTriggers();
		this.bindCloseBtn();
	}
}
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
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
		this.onPlayerReady = this.onPlayerReady.bind(this);
	}

	createPlayer(url) {
		this.player = new YT.Player(this.iframeBlockID, {
			height: '100%',
			width: '100%',
			videoId: `${url}`,
			//События, которые можно првязывать к плееру //Привязывем контекст вызова класса VideoPlayer
			events: {
				'onReady': this.onPlayerReady,
				'onStateChange': this.onPlayerStateChange
			}
		});

		this.overlay.classList.remove('fadeOut');
		this.overlay.classList.add('animated', 'fadeIn', 'show');
	}

	onPlayerReady(event) {
		event.target.playVideo();
	}

	onPlayerStateChange(state) {
		try {
			const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling,
				playBtnIcon = this.activeBtn.querySelector('svg').cloneNode(true);

			if (state.data === 0) {
				if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
					blockedElem.querySelector('.play__circle').classList.remove('closed');
					blockedElem.querySelector('svg').remove();
					blockedElem.querySelector('.play__circle').appendChild(playBtnIcon);
					blockedElem.querySelector('.play__text').textContent = 'play video';
					blockedElem.querySelector('.play__text').classList.remove('attention');
					blockedElem.style.filter = 'none';
					blockedElem.style.opacity = '1';
					blockedElem.setAttribute('data-disabled', 'false');
				}
			}
		} catch (e) { }
	}

	bindCloseBtn() {
		this.close.addEventListener('click', e => {
			this.overlay.classList.remove('fadeIn');
			this.overlay.classList.add('fadeOut');
			this.player.stopVideo();
			// this.player.destroy();

			setTimeout(() => {
				this.overlay.classList.remove('fadeIn', 'show');
			}, 1000);
		});
	}

	bindTriggers() {
		this.btns.forEach((btn, i) => {
			try {
				const blockedElem = btn.closest('.module__video-item').nextElementSibling;

				if (i % 2 == 0) {
					blockedElem.setAttribute('data-disabled', 'true');
				}
			} catch (e) { }

			btn.addEventListener('click', (e) => {
				if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
					this.activeBtn = btn;

					if (document.querySelector('iframe#frame')) {
						this.overlay.classList.remove('fadeOut');
						this.overlay.classList.add('animated', 'fadeIn', 'show');

						if (this.path !== btn.dataset.url) {
							this.path = btn.dataset.url;

							this.player.loadVideoById({ videoId: this.path });
						} else {
							this.player.playVideo()
						}
					} else {
						this.path = btn.dataset.url;

						this.createPlayer(this.path);
					}
				}
			});
		});
	}

	init() {
		if (this.btns.length > 0) {
			//Асинхронное подключение JavaScript API проигрывателя IFrame
			const tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			this.bindTriggers();
			this.bindCloseBtn();
		}
	}
}
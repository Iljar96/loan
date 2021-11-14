export default class Download {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers);
		this.path = 'assets/img/mainbg.jpg';
	}

	downloadItem(path) {
		const element = document.createElement('a');
		const name = path.substring(path.lastIndexOf('/') + 1);

		element.setAttribute('href', path);
		element.setAttribute('download', name);

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	init() {
		this.btns.forEach(btn => btn.addEventListener('click', () => this.downloadItem(this.path)));
	}
}
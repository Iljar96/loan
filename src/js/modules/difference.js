export default class Difference {
	constructor(oldOfficer, newOfficer, items) {
		this.oldOfficer = document.querySelector(oldOfficer);
		this.newOfficer = document.querySelector(newOfficer);
		this.oldItems = this.oldOfficer.querySelectorAll(items);
		this.newItems = this.newOfficer.querySelectorAll(items);
		this.oldCounter = 0;
		this.newCounter = 0;
	}

	hideItems(items) {
		items.forEach((item, i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
	}

	bindTriggers(officer, items, counter) {
		const btn = officer.querySelector('.plus');
		btn.addEventListener('click', () => {
			if (counter < items.length) {
				items[counter].style.display = '';
				items[counter].classList.add('animated', 'fadeIn');

				counter++;
			}

			if (counter === items.length - 1) {
				items[counter].style.display = 'none';
			}
		});
	}

	init() {
		this.hideItems(this.oldItems);
		this.hideItems(this.newItems);

		this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
		this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
	}
}
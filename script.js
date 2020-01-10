document.addEventListener('DOMContentLoaded', function () {

	const rand = function(min, max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	const hideItems = function () {
		timeout = setTimeout(function () {
			document.querySelectorAll('#grid li').forEach(function (e, i) {
				e.classList.add('hidden');
			});
		}, timeoutDuration*1000);
	}

	let grid;
	let timeout;
	let timeoutDuration = 2;

	let rasterSize = 8;
	let amount = 9;

	let positions = [];
	let nextNumber = 1;

	let reset = function () {
		positions = [];
		nextNumber = 1;

		// generate new positions
		for (let i = 0; i < amount; i++) {

			let position = JSON.stringify([rand(0,rasterSize),rand(0,rasterSize)]);

			while (positions.indexOf(position) > -1) {
				position = JSON.stringify([rand(0,rasterSize),rand(0,rasterSize)]);
				// console.log('needed to generate new position');
			}

			positions.push(position);
		}

		// show all numbers
		document.querySelectorAll('#grid li').forEach(function (e, i) {
			e.classList.remove('hidden');
		});
	}

	reset();

	grid = new Vue({
		'el': '#grid',
		'data': {
			'level': 0,
			'items': positions
		},
		'methods': {
			'toggle': function (event) {
				let item = event.target.getAttribute('data-item');

				if (nextNumber == item) {
					event.target.classList.toggle('hidden');

					if (item == amount) {
						console.warn('gewonnen!');
						reset();
						this.items = positions;
						this.level += 1;
						hideItems();
					}

					nextNumber += 1;
				} else {
					reset();
					this.items = positions;
					console.warn('verloren!');
					hideItems();
				}
			}
		}
	});

	hideItems();
});

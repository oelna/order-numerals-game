document.addEventListener('DOMContentLoaded', function () {

	const rand = function(min, max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	let grid;
	let timeout;
	let timeoutDuration = 4;

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

				if (item == '1') {
					document.querySelectorAll('#grid li').forEach(function (e, i) {
						if (e.textContent != '1') {
							e.classList.add('hidden');
						}
					});
				}

				if (nextNumber == item) {
					event.target.classList.toggle('hidden');

					if (item == amount) {
						console.warn('gewonnen!');
						reset();
						this.items = positions;
						this.level += 1;
					}

					nextNumber += 1;
				} else {
					// show all items briefly
					document.querySelectorAll('#grid li').forEach(function (e, i) {
						e.classList.remove('hidden');
					});

					console.warn('verloren!');

					timeout = setTimeout(function (ref) {
						reset();
						ref.items = positions;
					}, timeoutDuration*1000, this);
				}
			}
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {

	const rand = function(min, max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	let grid;
	let timeout;
	let timeoutDuration = 4;

	let rasterSize = 8; /* watch out! dependencies in CSS! */
	let amount = 4;

	let nextNumber;

	grid = new Vue({
		'el': '#grid',
		'data': {
			'level': 0,
			'nextNumber': 1,
			'items': []
		},
		'created': function () {},
		'methods': {
			'toggle': function (event) {
				let target = event.target;
				if (target.getAttribute('data-item') == null) target = event.target.parentNode;
				let item = parseInt(target.getAttribute('data-item'));
				
				if (this.nextNumber == 1 && item != 1) {
					console.log('please start at 1');
					return;
				}

				if (item == 1) {
					document.querySelectorAll('#grid li').forEach(function (e, i) {
						e.classList.add('hidden');
					});
				}

				if (this.nextNumber == item) {
					target.classList.toggle('hidden');

					if (item == amount+this.level) {
						console.warn('gewonnen!');
						if (this.level < 5) this.level += 1;
						reset();
					} else {
						this.nextNumber += 1;
					}
				} else {
					// show all items briefly
					document.querySelectorAll('#grid li').forEach(function (e, i) {
						e.classList.remove('hidden');
					});

					console.warn('verloren!');

					timeout = setTimeout(function (ref) {
						reset();
					}, timeoutDuration*1000, this);
				}
			}
		}
	});

	let reset = function () {
		grid.items = [];
		grid.nextNumber = 1;

		// generate new positions
		for (let i = 0; i < (amount+grid.level); i++) {

			let position = JSON.stringify([rand(0,rasterSize+1),rand(0,rasterSize+1)]);

			while (grid.items.indexOf(position) > -1) {
				position = JSON.stringify([rand(0,rasterSize+1),rand(0,rasterSize+1)]);
				console.log('needed to generate new position');
			}

			grid.items.push(position);
		}

		// show all numbers
		document.querySelectorAll('#grid li').forEach(function (e, i) {
			e.classList.remove('hidden');
		});
	}

	reset();
});

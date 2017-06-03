/* A collection of utils fonction */

export const parseNDJSON = (string) => {
		/*
		 * Parse an NDJSON strong to a proper list of object.
		 * */
		let array = string.split('\n');
		array.pop();

		return array.map((o) => {
			return JSON.parse(o)
		});
	}

export const debounce = (fn, delay) => {
		var timer = null;
		return () => {
			let context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}




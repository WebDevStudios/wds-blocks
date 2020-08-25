function onClicks(e) {
	e.preventDefault();
	let button = e.currentTarget;
	let container = button.parentNode;
	let content = container.querySelector('.wdsblocks-accordion__content');

	let props = {
		container: container,
		button: button,
		content: content,
	};
	if (props.container.classList.contains('is-expanded')) {
		collapse(props);
	} else {
		expand(props);
	}
}

function expand(props) {
	props.container.classList.add('is-expanded');
	props.button.setAttribute('aria-expanded', true);
	props.content.setAttribute('aria-hidden', false);
	props.content.focus();
}

function collapse(props) {
	props.container.classList.remove('is-expanded');
	props.button.setAttribute('aria-expanded', false);
	props.content.setAttribute('aria-hidden', true);
}

const accordions = document.querySelectorAll('.wdsblocks-accordion');
if (accordions) {
	[...accordions].forEach((accordion, index) => {
		let button = accordion.querySelector('.wdsblocks-accordion__title');
		if (button) {
			button.addEventListener('click', onClicks);
		}
	});
}

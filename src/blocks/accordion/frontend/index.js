const wdsBlocksAccordion = {
	click: (e) => {
		e.preventDefault();
		let button = e.currentTarget;
		let props = {
			container: button.parentNode,
			button: button,
			content: button.parentNode.querySelector(
				'.wp-block-wdsblocks-accordion__content'
			),
		};
		if (props.container.classList.contains('is-expanded')) {
			wdsBlocksAccordion.collapse(props);
		} else {
			wdsBlocksAccordion.expand(props);
		}
	},
	/**
	 * Expand accordion
	 */
	expand: (props) => {
		props.container.classList.add('is-expanded');
		props.button.setAttribute('aria-expanded', true);
		props.content.setAttribute('aria-hidden', false);

		// Get first inner div
		let inner = props.content.querySelector('div:first-child');
		// Set height on content div
		props.content.style.height = inner.clientHeight + 'px';
		// Delay and add focus
		setTimeout(function () {
			props.content.focus();
		}, 200);
	},
	/**
	 * Collapse accordion
	 */
	collapse: (props) => {
		props.container.classList.remove('is-expanded');
		props.button.setAttribute('aria-expanded', false);
		props.content.setAttribute('aria-hidden', true);
		props.content.style.height = '0px';
	},
};

// Get all accordions
const accordions = document.querySelectorAll('.wp-block-wdsblocks-accordion');
if (accordions) {
	[...accordions].forEach((accordion, index) => {
		let button = accordion.querySelector(
			'.wp-block-wdsblocks-accordion__title'
		);
		if (button) {
			button.addEventListener('click', wdsBlocksAccordion.click);
		}
	});
}

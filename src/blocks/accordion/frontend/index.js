const accordionClass = 'wp-block-wdsblocks-accordion';
const buttonClass = `${accordionClass} button.${accordionClass}__title`;
const expandedClass = 'is-expanded';

const wdsBlocksAccordion = {
	/**
	 * Initial Accordion Setup.
	 */
	init: () => {
		const accordions = document.querySelectorAll(`.${accordionClass}`); // Get all accordions.
		if (!accordions) {
			return false;
		}
		// Loop all accordions.
		[...accordions].forEach((accordion) => {
			let button = accordion.querySelector(`.${accordionClass}__title`);
			if (button) {
				button.addEventListener('click', wdsBlocksAccordion.click);
			}
		});
	},

	/**
	 * Accordion click event.
	 *
	 * @param {HTMLElement}
	 */
	click: (e) => {
		e.preventDefault();
		let button = e.currentTarget;
		let props = {
			container: button.parentNode,
			button: button,
			content: button.parentNode.querySelector(
				`.${accordionClass}__content`
			),
		};
		if (props.container.classList.contains(expandedClass)) {
			wdsBlocksAccordion.collapse(props);
		} else {
			// Close open accordion when `will-toggle` class is active.
			if (button.classList.contains('will-toggle')) {
				wdsBlocksAccordion.closeActive(props.container);
			}
			wdsBlocksAccordion.expand(props);
		}
	},

	/**
	 * Expand accordion.
	 */
	expand: (props) => {
		props.container.classList.add(expandedClass);
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
	 * Collapse accordion.
	 */
	collapse: (props) => {
		props.container.classList.remove(expandedClass);
		props.button.setAttribute('aria-expanded', false);
		props.content.setAttribute('aria-hidden', true);
		props.content.style.height = '0px';
	},

	/**
	 * Close currently active accordion.
	 */
	closeActive: (container = '') => {
		let active = container.parentNode.querySelector(`.${expandedClass}`); // Get active accordion from container parent.
		if (active) {
			active.querySelector(`.${buttonClass}`).click(); // Trigger click on button.
		}
	},
};
export default wdsBlocksAccordion;

// Get Accordion Groups
const accordionGroups = document.querySelectorAll(`.${accordionClass}-group`);
if (accordionGroups) {
	[...accordionGroups].forEach((group) => {
		const openFirst = group.dataset.openFirst
			? group.dataset.openFirst
			: false;
		const toggle = group.dataset.toggle ? group.dataset.toggle : false;
		if ('true' === toggle) {
			setupToggle(group, buttonClass);
		}

		// Open first section
		if ('true' === openFirst) {
			const first = group.querySelector(`.${buttonClass}`);
			first.click();
		}
	});
}

function setupToggle(group, buttonClass) {
	const buttons = group.querySelectorAll(`.${buttonClass}`);
	[...buttons].forEach((button) => {
		button.classList.add('will-toggle');
	});
}

const accordionsClass = 'wp-block-wdsblocks-accordions';
const accordionClass = 'wp-block-wdsblocks-accordion';
const buttonClass = `${ accordionClass }__title`;
const expandedClass = 'is-expanded';
const collapseClass = 'will-collapse';

const wdsBlocksAccordion = {
	/**
	 * Initial Accordion Setup.
	 */
	init: () => {
		// Get all accordions.
		const accordions = document.querySelectorAll( `.${ accordionClass }` );
		if ( ! accordions ) {
			return false; // Exit.
		}
		// Loop all accordions.
		[ ...accordions ].forEach( ( accordion ) => {
			const button = accordion.querySelector( `.${ buttonClass }` );
			if ( button ) {
				button.addEventListener( 'click', wdsBlocksAccordion.click );
				button.addEventListener( 'keypress', function ( event ) {
					// Enter/Return click
					if ( event.which === 13 || event.keyCode === 13 ) {
						wdsBlocksAccordion.click( event );
					}
				} );
			}
		} );

		// Get all accordion groups.
		const accordionGroups = document.querySelectorAll(
			`.${ accordionsClass }`
		);
		if ( ! accordionGroups ) {
			return false; // Exit.
		}
		// Loop all accordion groups.
		[ ...accordionGroups ].forEach( ( group ) => {
			wdsBlocksAccordion.setToggles( group );
			wdsBlocksAccordion.openFirst( group );
		} );
	},

	/**
	 * Accordion click event.
	 *
	 * @param {Event} e
	 */
	click: ( e ) => {
		e.preventDefault();
		const button = e.currentTarget;
		const props = {
			container: button.parentNode,
			button,
			content: button.parentNode.querySelector(
				`.${ accordionClass }__content`
			),
		};
		if (
			props.container.classList.contains( expandedClass ) ||
			props.container.parentNode.classList.contains( expandedClass )
		) {
			wdsBlocksAccordion.collapse( props );
		} else {
			// Close open accordion when `will-collapse` class is active.
			if ( button.classList.contains( collapseClass ) ) {
				wdsBlocksAccordion.closeActive( props.container );
			}
			wdsBlocksAccordion.expand( props, true );
		}
	},

	/**
	 * Expand accordion.
	 *
	 * @param {Object} props
	 * @param {boolean} moveFocus
	 */
	expand: ( props, moveFocus = true ) => {
		props.container.classList.add( expandedClass );
		props.button.setAttribute( 'aria-expanded', true );
		props.content.setAttribute( 'aria-hidden', false );

		// Get first inner div
		const child = props.content.querySelector( 'div:first-child' );

		// Set height on content div
		props.content.style.height = child.clientHeight + 'px';
		// Delay and add focus
		setTimeout( function () {
			if ( moveFocus ) {
				props.content.focus();
			}
		}, 200 );
	},

	/**
	 * Collapse accordion.
	 *
	 * @param {Object} props
	 */
	collapse: ( props ) => {
		props.container.classList.remove( expandedClass );
		props.button.setAttribute( 'aria-expanded', false );
		props.content.setAttribute( 'aria-hidden', true );
		props.content.style.height = '0px';
	},

	/**
	 * Expand first accordion is set in block editor.
	 *
	 * @param {HTMLElement} group
	 */
	openFirst: ( group ) => {
		if ( ! group ) {
			return false;
		}

		// Get data attribute.
		const openFirst = group.dataset.openFirst
			? group.dataset.openFirst
			: false;

		const firstButton = group.querySelector( `.${ buttonClass }` );
		if ( ! firstButton ) {
			return false;
		}
		const props = {
			container: firstButton.parentNode,
			button: firstButton,
			content: firstButton.parentNode.querySelector(
				`.${ accordionClass }__content`
			),
		};
		if ( 'true' === openFirst ) {
			wdsBlocksAccordion.expand( props, false );
		} else {
			// Used in the Block Editor only.
			wdsBlocksAccordion.collapse( props, false );
		}
	},

	/**
	 * Set up accordion toggle functionality.
	 *
	 * @param {HTMLElement} group
	 */
	setToggles: ( group ) => {
		if ( ! group ) {
			return false;
		}
		const toggle = group.dataset.toggle ? group.dataset.toggle : false;
		const buttons = group.querySelectorAll( `.${ buttonClass }` );
		if ( ! buttons ) {
			return false;
		}
		[ ...buttons ].forEach( ( button ) => {
			// Need to conditional if/else here for Block Editor integration.
			if ( 'true' === toggle ) {
				button.classList.add( collapseClass );
			} else {
				button.classList.remove( collapseClass );
			}
		} );
	},

	/**
	 * Close currently active accordion.
	 *
	 * @param {HTMLElement} container
	 */
	closeActive: ( container ) => {
		if ( ! container ) {
			return false;
		}
		// Get active accordion from container parent or parent parent (Block editor integration).
		const active =
			container.parentNode.querySelector( `.${ expandedClass }` ) ||
			container.parentNode.parentNode.querySelector(
				`.${ expandedClass }`
			);
		if ( ! active ) {
			return false;
		}
		const button = active.querySelector( `.${ buttonClass }` );
		if ( ! button ) {
			return false;
		}
		button.click(); // Trigger click on button.
	},
};
export default wdsBlocksAccordion;

import { __ } from '@wordpress/i18n';

/**
 * The Slider component displays a carousel slider wrapper.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function Slider( props ) {
	const { slideCount, isAdmin = false, children } = props;
	const dots = [];

	// Generate dot buttons per slide count.
	for ( let i = 0; i < slideCount; i++ ) {
		dots.push(
			<button
				className="glide__bullet slider-dot"
				data-glide-dir={ `=${ i }` }
				key={ i }
			></button>
		);
	}

	return (
		<>
			<div className="glide__track slider-track" data-glide-el="track">
				{ children }
			</div>
			<div
				className="glide__arrows slider-arrows"
				data-glide-el="controls"
			>
				<button
					className="glide__arrow glide__arrow--left slider-arrow slider-arrow-left"
					data-glide-dir="<"
				>
					{ __( 'Previous', 'wdsblocks' ) }
				</button>
				<button
					className="glide__arrow glide__arrow--right slider-arrow slider-arrow-right"
					data-glide-dir=">"
				>
					{ __( 'Next', 'wdsblocks' ) }
				</button>
			</div>
			<div
				className="glide__bullets slider-dots"
				data-glide-el="controls[nav]"
			>
				{ dots }
			</div>
		</>
	);
}

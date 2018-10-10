/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import OtherOptionsAttributes from './attributes';
import OtherOptionsClasses from './classes';
import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	OtherOptionsAttributes,
	OtherOptionsClasses,
};

function OtherOptions( props ) {
	const setAnimationType = value => props.setAttributes( { animationType: value } );

	return (
		<PanelBody
			title={ __( 'Other Options' ) }
			className="wds-other-options"
			initialOpen={ false }
		>
			<PanelRow>
				<div className="wds-animation-type">
					<div>
						<SelectControl
							key="animation-type"
							label={ __( 'Animation Type' ) }
							value={ props.attributes.animationType ? props.attributes.animationType : '' }
							options={ [
								{
									label: __( 'None' ),
									value: '',
								},
								{
									label: __( 'bounce' ),
									value: 'bounce',
								},
								{
									label: __( 'flash' ),
									value: 'flash',
								},
								{
									label: __( 'pulse' ),
									value: 'pulse',
								},
								{
									label: __( 'rubberBand' ),
									value: 'rubberBand',
								},
								{
									label: __( 'shake' ),
									value: 'shake',
								},
								{
									label: __( 'headShake' ),
									value: 'headShake',
								},
								{
									label: __( 'swing' ),
									value: 'swing',
								},
								{
									label: __( 'tada' ),
									value: 'tada',
								},
								{
									label: __( 'wobble' ),
									value: 'wobble',
								},
								{
									label: __( 'jello' ),
									value: 'jello',
								},
								{
									label: __( 'bounceIn' ),
									value: 'bounceIn',
								},
								{
									label: __( 'bounceInDown' ),
									value: 'bounceInDown',
								},
								{
									label: __( 'bounceInLeft' ),
									value: 'bounceInLeft',
								},
								{
									label: __( 'bounceInRight' ),
									value: 'bounceInRight',
								},
								{
									label: __( 'bounceInUp' ),
									value: 'bounceInUp',
								},
								{
									label: __( 'bounceOut' ),
									value: 'bounceOut',
								},
								{
									label: __( 'bounceOutDown' ),
									value: 'bounceOutDown',
								},
								{
									label: __( 'bounceOutLeft' ),
									value: 'bounceOutLeft',
								},
								{
									label: __( 'bounceOutRight' ),
									value: 'bounceOutRight',
								},
								{
									label: __( 'bounceOutUp' ),
									value: 'bounceOutUp',
								},
								{
									label: __( 'fadeIn' ),
									value: 'fadeIn',
								},
								{
									label: __( 'fadeInDown' ),
									value: 'fadeInDown',
								},
								{
									label: __( 'fadeInDownBig' ),
									value: 'fadeInDownBig',
								},
								{
									label: __( 'fadeInLeft' ),
									value: 'fadeInLeft',
								},
								{
									label: __( 'fadeInLeftBig' ),
									value: 'fadeInLeftBig',
								},
								{
									label: __( 'fadeInRight' ),
									value: 'fadeInRight',
								},
								{
									label: __( 'fadeInRightBig' ),
									value: 'fadeInRightBig',
								},
								{
									label: __( 'fadeInUp' ),
									value: 'fadeInUp',
								},
								{
									label: __( 'fadeInUpBig' ),
									value: 'fadeInUpBig',
								},
								{
									label: __( 'fadeOut' ),
									value: 'fadeOut',
								},
								{
									label: __( 'fadeOutDown' ),
									value: 'fadeOutDown',
								},
								{
									label: __( 'fadeOutDownBig' ),
									value: 'fadeOutDownBig',
								},
								{
									label: __( 'fadeOutLeft' ),
									value: 'fadeOutLeft',
								},
								{
									label: __( 'fadeOutLeftBig' ),
									value: 'fadeOutLeftBig',
								},
								{
									label: __( 'fadeOutRight' ),
									value: 'fadeOutRight',
								},
								{
									label: __( 'fadeOutRightBig' ),
									value: 'fadeOutRightBig',
								},
								{
									label: __( 'fadeOutUp' ),
									value: 'fadeOutUp',
								},
								{
									label: __( 'fadeOutUpBig' ),
									value: 'fadeOutUpBig',
								},
								{
									label: __( 'flipInX' ),
									value: 'flipInX',
								},
								{
									label: __( 'flipInY' ),
									value: 'flipInY',
								},
								{
									label: __( 'flipOutX' ),
									value: 'flipOutX',
								},
								{
									label: __( 'flipOutY' ),
									value: 'flipOutY',
								},
								{
									label: __( 'lightSpeedIn' ),
									value: 'lightSpeedIn',
								},
								{
									label: __( 'lightSpeedOut' ),
									value: 'lightSpeedOut',
								},
								{
									label: __( 'rotateIn' ),
									value: 'rotateIn',
								},
								{
									label: __( 'rotateInDownLeft' ),
									value: 'rotateInDownLeft',
								},
								{
									label: __( 'rotateInDownRight' ),
									value: 'rotateInDownRight',
								},
								{
									label: __( 'rotateInUpLeft' ),
									value: 'rotateInUpLeft',
								},
								{
									label: __( 'rotateInUpRight' ),
									value: 'rotateInUpRight',
								},
								{
									label: __( 'rotateOut' ),
									value: 'rotateOut',
								},
								{
									label: __( 'rotateOutDownLeft' ),
									value: 'rotateOutDownLeft',
								},
								{
									label: __( 'rotateOutDownRight' ),
									value: 'rotateOutDownRight',
								},
								{
									label: __( 'rotateOutUpLeft' ),
									value: 'rotateOutUpLeft',
								},
								{
									label: __( 'rotateOutUpRight' ),
									value: 'rotateOutUpRight',
								},
								{
									label: __( 'hinge' ),
									value: 'hinge',
								},
								{
									label: __( 'jackInTheBox' ),
									value: 'jackInTheBox',
								},
								{
									label: __( 'rollIn' ),
									value: 'rollIn',
								},
								{
									label: __( 'rollOut' ),
									value: 'rollOut',
								},
								{
									label: __( 'zoomIn' ),
									value: 'zoomIn',
								},
								{
									label: __( 'zoomInDown' ),
									value: 'zoomInDown',
								},
								{
									label: __( 'zoomInLeft' ),
									value: 'zoomInLeft',
								},
								{
									label: __( 'zoomInRight' ),
									value: 'zoomInRight',
								},
								{
									label: __( 'zoomInUp' ),
									value: 'zoomInUp',
								},
								{
									label: __( 'zoomOut' ),
									value: 'zoomOut',
								},
								{
									label: __( 'zoomOutDown' ),
									value: 'zoomOutDown',
								},
								{
									label: __( 'zoomOutLeft' ),
									value: 'zoomOutLeft',
								},
								{
									label: __( 'zoomOutRight' ),
									value: 'zoomOutRight',
								},
								{
									label: __( 'zoomOutUp' ),
									value: 'zoomOutUp',
								},
								{
									label: __( 'slideInDown' ),
									value: 'slideInDown',
								},
								{
									label: __( 'slideInLeft' ),
									value: 'slideInLeft',
								},
								{
									label: __( 'slideInRight' ),
									value: 'slideInRight',
								},
								{
									label: __( 'slideInUp' ),
									value: 'slideInUp',
								},
								{
									label: __( 'slideOutDown' ),
									value: 'slideOutDown',
								},
								{
									label: __( 'slideOutLeft' ),
									value: 'slideOutLeft',
								},
								{
									label: __( 'slideOutRight' ),
									value: 'slideOutRight',
								},
								{
									label: __( 'slideOutUp' ),
									value: 'slideOutUp',
								},

							] }
							onChange={ setAnimationType }
						/>
					</div>
					<div>
						{ __( 'Select the animation for this block. Animations can only be applied to the entire block, not to individual elements.' ) }
					</div>
				</div>
			</PanelRow>

		</PanelBody>
	);
}

export default OtherOptions;

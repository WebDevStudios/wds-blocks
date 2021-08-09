import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { PREFIX, CONTAINER_CLASS } from '../../utils/config';
import withBackgroundColor from '../../utils/components/with-background-color';
import withFontColor from '../../utils/components/with-font-color';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement} Element to render.
 */
export default function Save( props ) {
	const {
		attributes: {
			title,
			desc,
			fontColor,
			customFontColor,
			backgroundColor,
			customBackgroundColor,
			openFirst,
			toggle,
		},
	} = props;

	const className = getBlockDefaultClassName( `${ PREFIX }/accordions` );

	// Define props for wrapping component.
	const wrapProps = {
		className,
		'data-open-first': openFirst,
		'data-toggle': toggle,
	};

	// Define HOCs to be composed.
	const composeHOCs = [];

	// Display accordion with custom font color.
	if ( fontColor || customFontColor ) {
		composeHOCs.push( withFontColor );
		wrapProps.fontColor = fontColor;
		wrapProps.customFontColor = customFontColor;
	}

	// Display accordion with custom background color.
	if ( backgroundColor || customBackgroundColor ) {
		composeHOCs.push( withBackgroundColor );
		wrapProps.backgroundColor = backgroundColor;
		wrapProps.customBackgroundColor = customBackgroundColor;
	}

	const AccordionComponent = compose( composeHOCs )( 'div' ); // eslint-disable-line @wordpress/no-unused-vars-before-return

	return (
		<AccordionComponent { ...wrapProps }>
			<div className={ CONTAINER_CLASS }>
				{ title && title[ 0 ] && (
					<RichText.Content
						tagName="h2"
						className={ `${ className }__title` }
						value={ title }
					/>
				) }
				{ desc && desc[ 0 ] && (
					<RichText.Content
						tagName="p"
						className={ `${ className }__desc` }
						value={ desc }
					/>
				) }
				<div className={ `${ className }__content` }>
					<InnerBlocks.Content />
				</div>
			</div>
		</AccordionComponent>
	);
}

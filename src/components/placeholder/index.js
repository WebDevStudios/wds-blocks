/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { BlockIcon } = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';

function Placeholder( { icon, children, label, instructions, className, ...additionalProps } ) {
	const classes = classnames( 'wds-components-placeholder', className );

	return (
		<div { ...additionalProps } className={ classes }>
			<div className="wds-components-placeholder__label">
				{ !! icon && <BlockIcon icon={ icon } /> }
				{ label }
			</div>
			{ !! instructions && <div className="wds-components-placeholder__instructions">{ instructions }</div> }
			<div className="wds-components-placeholder__fieldset">
				{ children }
			</div>
		</div>
	);
}

export default Placeholder;

/**
 * Internal dependencies
 */
import classnames from 'classnames';
import './editor.scss';

/**
 * Import our attributes.
 */
import { BlockTitleAttributes } from './attributes';
import { BlockTitleOutput } from './title';

/**
 * Export for ease of importing in individual blocks.
 */
export {
	BlockTitleAttributes,
	BlockTitleOutput
};

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	PlainText
} = wp.editor;

export default class BlockTitle extends Component {
	onChangeBlockTitle = value => {
		const { setAttributes } = this.props;
		setAttributes( { blockTitle: value } );
	};

	render() {
		return (
			<header className="content-block-header">
				<h2
					style={ {
						color: this.props.attributes.textColor ? this.props.attributes.textColor : null
					} }
				>
					<PlainText
						className={ classnames(
							'wds-block-title',
							{ 'no-title-set': ! this.props.attributes.blockTitle },
						) }
						value={ ! this.props.attributes.blockTitle ? '' : this.props.attributes.blockTitle }
						onChange={ this.onChangeBlockTitle }
						placeholder={ this.props.placeholder ? this.props.placeholder : __( 'Block Title (optional)' ) }
						style={ {
							textAlign: this.props.attributes.alignment,
							color: this.props.attributes.textColor ? this.props.attributes.textColor : null
						} }
					/>
				</h2>
			</header>
		);
	}
}

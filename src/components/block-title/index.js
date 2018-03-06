import classnames from 'classnames';

// Import our attributes.
import { BlockTitleAttributes } from './attributes';
import { BlockTitleOutput } from './title';

// Export for ease of importing in individual blocks.
export {
	BlockTitleAttributes,
	BlockTitleOutput,
};

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	PlainText,
} = wp.blocks;

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
						color: this.props.attributes.textColor ? this.props.attributes.textColor : null,
					} }
				>
					<PlainText
						className={ classnames(
							'block-title',
							{ 'no-title-set': ! this.props.attributes.blockTitle },
						) }
						value={ ! this.props.attributes.blockTitle ? null : this.props.attributes.blockTitle }
						onChange={ this.onChangeBlockTitle }
						placeholder={ this.props.placeholder ? this.props.placeholder : __( 'Two-Column Content Block Section Title (optional)' ) }
					/>
				</h2>
			</header>
		);
	}
}

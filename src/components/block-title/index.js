import classnames from 'classnames';

// Import our attributes.
import { BlockTitleAttributes } from './attributes';

// Export for ease of importing in individual blocks.
export {
	BlockTitleAttributes,
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
				<h2>
					<PlainText
						className={ classnames(
							'block-title',
							{ 'no-title-set': ! this.props.attributes.blockTitle },
						) }
						value={ ! this.props.attributes.blockTitle ? __( 'Two-Column Content Block Section Title (optional)' ) : this.props.attributes.blockTitle }
						onChange={ this.onChangeBlockTitle }
					/>
				</h2>
			</header>
		);
	}
}

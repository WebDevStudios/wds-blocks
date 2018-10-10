import './editor.scss';

// Import other functionality.
import { ButtonLinkAttributes } from './attributes';
import { ButtonLinkOutput } from './button';

// Export for ease of importing in individual blocks.
export { ButtonLinkAttributes, ButtonLinkOutput };

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const { PlainText, URLInput } = wp.editor;

const { IconButton, Dashicon } = wp.components;

/**
 * Create a button component
 *
 * @param {string} value The string value of the saved attribute.
 */
export default class ButtonLink extends Component {
	onChangeButtonText = value => {
		const { setAttributes } = this.props;
		setAttributes( { buttonText: value } );
	};

	onChangeButtonURL = value => {
		const { setAttributes } = this.props;
		setAttributes( { buttonUrl: value } );
	};

	render() {
		return (
			<div
				className={ 'button wds-button-component button-large' }
			>
				<PlainText
					value={ this.props.attributes.buttonText }
					placeholder={
						this.props.placeholder ? this.props.placeholder : __( 'Click Here' )
					}
					onChange={ this.onChangeButtonText }
				/>

				<form
					key="form-link"
					className="blocks-button__inline-link"
					onSubmit={ event => event.preventDefault() }
				>
					<Dashicon icon="admin-links" />
					<URLInput
						value={ this.props.attributes.buttonUrl }
						onChange={ this.onChangeButtonURL }
					/>
					<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
				</form>
			</div>
		);
	}
}

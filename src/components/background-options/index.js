import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	MediaUpload,
} = wp.blocks;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class BackgroundOptions extends Component {
	imageBackgroundSelect() {
		if ( 'image' !== this.props.attributes.backgroundType ) {
			return '';
		}

		let isImageBackground = '';

		if ( ! this.props.attributes.backgroundImage ) {
			const imageID = '',
				imageURL = '';

			isImageBackground =
				<MediaUpload
					buttonProps={ {
						className: 'components-button button button-large',
					} }
					onSelect={ this.props.onChangeBackgroundImage }
					type="image"
					value={ imageID }
					render={ ( { open } ) => (
						<Button className="button button-large" onClick={ open }>
							<Dashicon icon="format-image" /> { ! imageID ? __( 'Upload Image' ) : <img src={ imageURL } alt="" /> }
						</Button>
					) }
				/>;
		} else {
			isImageBackground =
				<p className="image-wrapper">
					<img
						src={ this.props.attributes.backgroundImage.url }
						alt={ this.props.attributes.backgroundImage.alt }
					/>
					{ this.props.focus ? (
						<Button
							className="remove-image button button-large"
							onClick={ this.props.onRemoveBackgroundImage }
						>
							<Dashicon icon="no-alt" /> { __( 'Remove Image' ) }
						</Button>
					) : null }
				</p>;
		}

		return isImageBackground;
	}

	render() {
		return (
			<PanelBody
				title={ __( 'Background Options' ) }
				className="wds-background-options"
			>
				<PanelRow>
					<SelectControl
						key="background-type"
						label={ __( 'Background Type' ) }
						value={ this.props.attributes.backgroundType ? this.props.attributes.backgroundType : '' }
						options={ [
							{
								label: __( 'None' ),
								value: '',
							},
							{
								label: __( 'Image' ),
								value: 'image',
							},
							{
								label: __( 'Video' ),
								value: 'video',
							},
							{
								label: __( 'Color' ),
								value: 'color',
							},
						] }
						onChange={ this.props.onChangeBackgroundType }
					/>
				</PanelRow>
				<PanelRow>
					{ this.imageBackgroundSelect() }
				</PanelRow>
			</PanelBody>
		);
	}
}

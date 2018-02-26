import './style.scss';
import classnames from 'classnames';

// Import all of our Background Options requirements.
import BackgroundOptions from '../../components/background-options';
import { BackgroundOptionsAttributes } from '../../components/background-options/attributes';
import { BackgroundOptionsClasses } from '../../components/background-options/classes';
import { BackgroundOptionsInlineStyles } from '../../components/background-options/inline-styles';

// Import all of our Other Options requirements.
import OtherOptions from '../../components/other-options';
import { OtherOptionsAttributes } from '../../components/other-options/attributes';
import { OtherOptionsClasses } from '../../components/other-options/classes';
import { OtherOptionsInlineStyles } from '../../components/other-options/inline-styles';

// Internal block libraries.
const { __ } = wp.i18n;
const {
	InspectorControls,
	registerBlockType,
	RichText,
} = wp.blocks;

// Register block.
export default registerBlockType(
	'wds/editable-content-example-block-with-options',
	{
		title: __( 'WDS Example Block with Options' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Options' ),
			__( 'Editable' ),
			__( 'Multiline' ),
		],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block',
			},
			...BackgroundOptionsAttributes,
			...OtherOptionsAttributes,
		},
		edit: props => {
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			return [
				!! props.focus && (
					<InspectorControls key="inspector">
						<BackgroundOptions
							{ ...props }
						/>
						<OtherOptions
							{ ...props }
						/>
					</InspectorControls>
				),
				<section
					key="editable-content-example-block-with-options"
					className={ classnames(
						props.className,
						...BackgroundOptionsClasses( props ),
						...OtherOptionsClasses( props ),
					) }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
						...OtherOptionsInlineStyles( props ),
					} }
				>

					{ 'video' === props.attributes.backgroundType && props.attributes.backgroundVideo ? (
						<video
							className="video-container video-container-overlay"
							autoPlay="true"
							loop="true"
							muted="true"
						>
							<source
								type="video/mp4"
								src={ props.attributes.backgroundVideo.url }
							/>
						</video>
					) : (
						null
					) }

					<header className="content-block-header">
						<h2
							style={ {
								color: props.attributes.textColor ? props.attributes.textColor : null,
							} }
						>
							{ __( 'WDS Example Block with Options' ) }
						</h2>
					</header>

					<RichText
						tagName="div"
						multiline="p"
						className="content-block"
						placeholder={ __( 'Enter your content here for the WDS Example Block with Options' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
						focus={ props.focus }
						onFocus={ props.setFocus }
					/>
				</section>,
			];
		},
		save: props => {
			return (
				<section
					className={ classnames(
						props.className,
						...BackgroundOptionsClasses( props ),
						...OtherOptionsClasses( props ),
					) }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
						...OtherOptionsInlineStyles( props ),
					} }
				>

					{ 'video' === props.attributes.backgroundType && props.attributes.backgroundVideo ? (
						<video
							className="video-container video-container-overlay"
							autoPlay="true"
							loop="true"
							muted="true"
						>
							<source
								type="video/mp4"
								src={ props.attributes.backgroundVideo.url }
							/>
						</video>
					) : (
						null
					) }

					<header className="content-block-header">
						<h2>{ __( 'WDS Example Block with Options' ) }</h2>
					</header>

					<div className="content-block-content content-block">
						{ props.attributes.message }
					</div>
				</section>
			);
		},
	},
);

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, ResponsiveWrapper } from '@wordpress/components';

/**
 * Display media preview according to type.
 *
 * @author WebDevStudios
 * @since  2.1.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element} Media preview.
 */
function Preview( props ) {
	const { type, media, label } = props;
	const className = 'components-responsive-wrapper__content';

	switch ( type ) {
		case 'video':
			return (
				<video
					className={ className }
					autoPlay
					muted
					loop
					aria-hidden="true"
				>
					<source src={ media?.url } type={ media?.mime } />
				</video>
			);

		default:
			return (
				<img className={ className } src={ media?.url } alt={ label } />
			);
	}
}

/**
 * The MediaControl component displays a control to select a media item and display a preview.
 *
 * @author WebDevStudios
 * @since  2.1.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function MediaControl( props ) {
	const {
		media,
		setMedia,
		type = 'image',
		allowedTypes = [ type ],
		label,
		addLabel,
		removeLabel,
	} = props;

	return (
		<>
			<div className="components-base-control">
				<span className="components-base-control__label">
					{ label }
				</span>
				<MediaUploadCheck>
					<MediaUpload
						title={ label }
						onSelect={ ( value ) => setMedia( value ) }
						allowedTypes={ allowedTypes }
						value={ media }
						render={ ( { open } ) => (
							<Button
								onClick={ open }
								className={
									! media
										? 'editor-post-featured-image__toggle'
										: 'editor-post-featured-image__preview'
								}
							>
								{ ! media && addLabel }
								{ !! media && (
									<ResponsiveWrapper
										naturalWidth={ media?.width }
										naturalHeight={ media?.height }
									>
										<Preview
											media={ media }
											label={ label }
											type={ type }
										/>
									</ResponsiveWrapper>
								) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
				{ !! media && (
					<MediaUploadCheck>
						<Button
							onClick={ () => setMedia( undefined ) }
							isLink
							isDestructive
						>
							{ removeLabel }
						</Button>
					</MediaUploadCheck>
				) }
			</div>
		</>
	);
}

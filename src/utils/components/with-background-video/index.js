/**
 * A HOC for displaying a component with a background video.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {WPElement} WrappedComponent The wrapped component to display.
 * @return {Function}                   A function that accepts a single param, `props`, to display the wrapped component.
 */
export default function withBackgroundVideo( WrappedComponent ) {
	/**
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @param  {Object} [props] Properties passed to the component.
	 * @return {Element}        Element to render.
	 */
	return function ( props ) {
		const { backgroundVideo, children, ...passthruProps } = props;

		return (
			<WrappedComponent { ...passthruProps }>
				{ backgroundVideo && (
					<video
						autoPlay
						muted
						loop
						aria-hidden="true"
						className="wp-block-cover__video-background"
					>
						<source
							src={ backgroundVideo.url }
							type={ backgroundVideo.mime }
						/>
					</video>
				) }
				{ children }
			</WrappedComponent>
		);
	};
}

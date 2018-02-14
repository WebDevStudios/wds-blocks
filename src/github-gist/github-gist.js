/**
 * BLOCK: Github Gist
 */

// External dependencies
import jsonp from 'jsonp';
import icon from './icon';

// WordPress Dependencies
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Button, Placeholder, Spinner } = wp.components;
const { registerBlockType } = wp.blocks;

/**
 * Register: GitHub Gist Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wdsg/gihub-gist', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GitHub Gist' ), // Block title.
	icon,
	category: 'widgets', // maybe 'embed'?
	supportHTML: false,
	attributes: {
		url: {
			type: 'string',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: class extends Component {
		constructor() {
			super( ...arguments );
			this.doServerSideRender = this.doServerSideRender.bind( this );
			this.state = {
				html: '',
				styles: '',
				error: false,
				fetching: false,
			};
		}

		componentWillMount() {
			if ( this.props.attributes.url ) {
				this.setState( { fetching: true } );
				this.doServerSideRender();
			}
		}

		async doServerSideRender( event ) {
			if ( event ) {
				event.preventDefault();
			}

			const { url } = this.props.attributes;

			if ( ! this.isGistUrl( url ) ) {
				this.setState( { error: true } );
				return;
			}

			// Begin fetching data.
			this.setState( { error: false, fetching: true } );

			const [ gistError, gist ] = await this.catchErrors( this.fetchGist( url ) );

			if ( gistError ) {
				this.setState( { error: true, fetching: false } );
				return;
			}

			this.setState( { html: gist.div } );

			const [ stylesError, styles ] = await this.catchErrors( this.fetchStyles( gist.stylesheet ) );

			if ( stylesError ) {
				this.setState( { error: true, fetching: false } );
				return;
			}

			this.setState( { styles } );

			// End fetching data.
			this.setState( { fetching: false } );
		}

		// Is this a gist URL?
		isGistUrl( url ) {
			return 0 === url.indexOf( 'https://gist.github.com/' );
		}

		fetchGist( url ) {
			return new Promise( ( resolve, reject ) =>
				jsonp( `${ url }.json`, {}, ( err, data ) =>
					err ? reject( err ) : resolve( data ) ) );
		}

		async fetchStyles( stylesheetUrl ) {
			return ( await window.fetch( stylesheetUrl ) ).text();
		}

		catchErrors( promise ) {
			return promise.then( data => {
				return [ null, data ];
			} ).catch( err => [ err ] );
		}

		// Remove spaces and trailing slashes from URL
		formatUrl( url ) {
			return url.trim().replace( /\/+$/, '' );
		}

		render() {
			const { html, styles, error, fetching } = this.state;
			const { url } = this.props.attributes;
			const { setAttributes, className } = this.props;

			if ( fetching ) {
				return (
					<div key="loading" className="wp-block-embed is-loading">
						<Spinner />
						<p>{ __( 'Embedding…' ) }</p>
					</div>
				);
			}

			if ( ! html || ! styles ) {
				return (
					<div className={ className }>
						<Placeholder key="placeholder" icon={ icon } label={ __( 'Embed GitHub Gist' ) } className="wp-block-embed">
							<form onSubmit={ this.doServerSideRender }>
								<input
									type="url"
									value={ url || '' }
									className="components-placeholder__input"
									aria-label={ __( 'Embed GitHub Gist' ) }
									placeholder={ __( 'Enter URL to embed here…' ) }
									onChange={ event => setAttributes( { url: this.formatUrl( event.target.value ) } ) } />
								<Button
									isLarge
									type="submit">
									{ __( 'Embed' ) }
								</Button>
								{ error && <p className="components-placeholder__error">{ __( 'Sorry, that gist could not be embedded. Please check the URL and try again.' ) }</p> }
							</form>
						</Placeholder>
					</div>
				);
			}

			return (
				<div>
					<style>{ styles }</style>
					<div dangerouslySetInnerHTML={ { __html: html } } />
				</div>
			);
		}
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {

		// Todo: Create a render callback function in PHP that returns
		// <script src=<?php echo esc_url( $url . '.js' ); ?></scipt>
		// if on the front end of the site, or a link to the gist
		// if this is an RSS feed or google AMP.

		return null;
	},
} );

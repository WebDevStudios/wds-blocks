/**
 * External dependencies
 */
import jsonp from 'jsonp';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Button, Spinner } = wp.components;
const { registerBlockType } = wp.blocks;
const { BlockControls } = wp.editor;

/**
 * Internal dependencies
 */
import icon from './icon';
import Placeholder from '../../components/placeholder';
import './style.scss';
import './editor.scss';

/**
 * Register block: GitHub Gist
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wds/gihub-gist', {
	title: __( 'GitHub Gist Block (WDS)' ),
	description: __( 'A block to embed a Gist via URL.' ),
	icon,
	category: 'wds-blocks',
	supportHTML: false,
	attributes: {
		url: {
			type: 'string',
		},
	},

	edit: class extends Component {
		constructor() {
			super( ...arguments );
			this.fetchGistAndSetState = this.fetchGistAndSetState.bind( this );
			this.state = {
				html: '',
				styles: '',
				error: false,
				fetching: false,
			};
		}

		componentDidMount() {
			if ( this.props.attributes.url ) {
				this.fetchGistAndSetState();
			}
		}

		async fetchGistAndSetState( event ) {
			if ( event ) {
				event.preventDefault();
			}

			this.resetState();

			if ( ! this.isGistUrl() ) {
				this.setState( { error: true } );
				return;
			}

			// Begin fetching data.
			this.setState( { fetching: true } );

			const [ gistError, gist ] = await this.catchErrors( this.fetchGist() );

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

		resetState() {
			this.setState( {
				html: '',
				styles: '',
				error: false,
				fetching: false,
			} );
		}

		isGistUrl() {
			const { url } = this.props.attributes;
			return 0 === url.indexOf( 'https://gist.github.com/' );
		}

		fetchGist() {
			const url = this.removeTrailingSlash( this.props.attributes.url );
			return new Promise( ( resolve, reject ) =>
				jsonp( `${ url }.json`, { timeout: 5000 }, ( err, data ) =>
					err ? reject( err ) : resolve( data ) ) );
		}

		removeTrailingSlash( url ) {
			return url.replace( /\/+$/, '' );
		}

		async fetchStyles( stylesheetUrl ) {
			return ( await window.fetch( stylesheetUrl ) ).text();
		}

		catchErrors( promise ) {
			return promise.then( data => {
				return [ null, data ];
			} ).catch( err => [ err ] );
		}

		render() {
			const { html, styles, fetching } = this.state;
			const { className, isSelected } = this.props;

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
							{ this.getForm( true ) }
						</Placeholder>
					</div>
				);
			}

			return (
				<div className={ className }>
					{ isSelected &&
						<BlockControls key="controls">
							<div className="gist-block-controls">
								{ this.getForm() }
							</div>
						</BlockControls>
					}
					<style>{ styles }</style>
					<div dangerouslySetInnerHTML={ { __html: html } } />
				</div>
			);
		}

		getForm( showErrors ) {
			const { error } = this.state;
			const { url } = this.props.attributes;
			const { setAttributes } = this.props;

			return (
				<form onSubmit={ this.fetchGistAndSetState }>
					<input
						type="url"
						value={ url || '' }
						className="components-placeholder__input"
						aria-label={ __( 'Embed GitHub Gist' ) }
						placeholder={ __( 'Enter gist URL…' ) }
						onChange={ event => setAttributes( { url: event.target.value.trim() } ) }
					/>
					<Button
						isLarge
						type="submit">
						{ __( 'Embed' ) }
					</Button>
					{ error && showErrors && <p className="components-placeholder__error">{ __( 'Sorry, that gist could not be embedded. Please check the URL and try again.' ) }</p> }
				</form>
			);
		}
	},

	save: () => null,
} );

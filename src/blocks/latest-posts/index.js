/**
 * BLOCK: Latest Posts
 */

/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	Placeholder,
	RangeControl,
	Spinner,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;
const { decodeEntities } = wp.utils;
const {
	registerBlockType,
	Editable,
	QueryPanel,
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar
} = wp.blocks;

/**
 * Internal dependencies
 */
//import './editor.scss';
//import './style.scss';

const MAX_POSTS_COLUMNS = 6;

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wds/latest-posts', {
	title: __( 'Latest Posts' ),
	description: __( 'Shows a grid of your site\'s most recent posts.' ),
	category: 'widgets',
	icon: 'grid-view',
	keywords: [ __( 'recent posts' ) ],
	supports: {
		html: false,
	},
	edit: class extends Component {
		constructor() {
			super( ...arguments );

			this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
		}

		toggleDisplayPostDate() {
			const { displayPostDate } = this.props.attributes;
			const { setAttributes } = this.props;

			setAttributes( { displayPostDate: ! displayPostDate } );
		}

		render() {
			const latestPosts = this.props.latestPosts.data;
			const { attributes, isSelected, setAttributes } = this.props;
			const { displayPostDate, columns, order, orderBy, categories, postsToShow } = attributes;

			const inspectorControls = isSelected && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Latest Posts Settings' ) }</h3>
					<QueryPanel
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						category={ categories }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 2 }
						max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
					/>
				</InspectorControls>
			);

			const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
			if ( ! hasPosts ) {
				return [
					inspectorControls,
					<Placeholder key="placeholder"
						icon="admin-post"
						label={ __( 'Latest Posts' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>,
				];
			}

			// Removing posts from display should be instant.
			const displayPosts = latestPosts.length > postsToShow ?
				latestPosts.slice( 0, postsToShow ) :
				latestPosts;

			return [
				inspectorControls,
				<ul
					className={ this.props.className }
					key="latest-posts"
				>
					{ displayPosts.map( ( post, i ) =>
						<li key={ i }>
							<a href={ post.link } target="_blank">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
							{ displayPostDate && post.date_gmt &&
								<time dateTime={ moment( post.date_gmt ).utc().format() } className={ `${ this.props.className }__post-date` }>
									{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
								</time>
							}
						</li>
					) }
				</ul>,
			];
		}
	},
	save: () => null,
} );

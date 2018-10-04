/**
 * External dependencies
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const {
	PanelBody,
	Placeholder,
	SelectControl,
	RangeControl,
	Spinner,
	ToggleControl,
	Toolbar,
} = wp.components;
const { __ } = wp.i18n;
const { decodeEntities } = wp.htmlEntities;
const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;
const { withSelect } = wp.data;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const MAX_POSTS_COLUMNS = 6;
const DEFAULT_COLUMNS = 3;

// Import our Block Title component.
import BlockTitle from '../../components/block-title';

// Import our Block Title component.
import MultiSelect from '../../components/multiselect';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsInlineStyles, TextOptionsClasses } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsClasses } from '../../components/other-options';

const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 100;

class RecentPostsBlock extends Component {
	constructor() {
		super( ...arguments );

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	onOrderChange = ( value ) => this.props.setAttributes( { order: value } )

	onOrderByChange = ( value ) => this.props.setAttributes( { orderby: value } )

	onCategoryChange = value => {
		this.props.setAttributes( { taxonomies: JSON.stringify( value ) } );
	}

	onNumberOfItemsChange = ( value ) => this.props.setAttributes( { postsToShow: value } )

	render() {
		const maxItems = DEFAULT_MAX_ITEMS;
		const minItems = DEFAULT_MIN_ITEMS;
		const { attributes, setAttributes, latestPosts } = this.props;
		const { displayPostDate, align, postLayout, columns, order, orderby, postsToShow } = attributes;

		const inspectorControls = !! this.props.isSelected && (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Recent Posts Settings' ) }>
					{
						( this.onOrderChange && this.onOrderByChange ) && (
							<SelectControl
								key="query-controls-order-select"
								label={ __( 'Order by' ) }
								value={ `${ orderby }/${ order }` }
								options={ [
									{
										label: __( 'Newest to Oldest' ),
										value: 'date/desc',
									},
									{
										label: __( 'Oldest to Newest' ),
										value: 'date/asc',
									},
									{

										/* translators: label for ordering posts by title in ascending order */
										label: __( 'A → Z' ),
										value: 'title/asc',
									},
									{

										/* translators: label for ordering posts by title in descending order */
										label: __( 'Z → A' ),
										value: 'title/desc',
									},
								] }
								onChange={ ( value ) => {
									const [ newOrderBy, newOrder ] = value.split( '/' );
									if ( newOrder !== order ) {
										this.onOrderChange( newOrder );
									}
									if ( newOrderBy !== orderby ) {
										this.onOrderByChange( newOrderBy );
									}
								} }
							/>
						) }
					{ !! this.props.isSelected ? (
						<MultiSelect attributes={ this.props.attributes } onCategoryChange={ this.onCategoryChange } />
					) : ( null ) }
					{
						this.onNumberOfItemsChange && (
							<RangeControl
								key="query-controls-range-control"
								label={ __( 'Number of items' ) }
								value={ postsToShow }
								onChange={ this.onNumberOfItemsChange }
								min={ minItems }
								max={ maxItems }
							/>
						)
					}
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					{ 'grid' === postLayout &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns || DEFAULT_COLUMNS }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
						/>
					}
				</PanelBody>
				<BackgroundOptions
					{ ...this.props }
				/>
				<TextOptions
					{ ...this.props }
				/>
				<OtherOptions
					{ ...this.props }
				/>
			</InspectorControls>
		);

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		if ( ! hasPosts ) {
			return [
				inspectorControls,
				<Placeholder key="placeholder"
					icon="admin-post"
					label={ __( 'Recent Posts' ) }
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

		const layoutControls = [
			{
				icon: 'list-view',
				title: __( 'List View' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: 'list' === postLayout,
			},
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: 'grid' === postLayout,
			},
		];

		return [
			inspectorControls,
			!! this.props.isSelected && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>
			),
			<section
				key=""
				className={ classnames(
					this.props.className,
					...BackgroundOptionsClasses( this.props ),
					...OtherOptionsClasses( this.props ),
					...TextOptionsClasses( this.props ),
				) }
				style={ {
					...BackgroundOptionsInlineStyles( this.props ),
					...TextOptionsInlineStyles( this.props ),
				} }
			>
				{ BackgroundOptionsVideoOutput( this.props ) }

				<BlockTitle
					{ ...this.props }
				/>
				<ul
					className={ classnames( {
						'is-grid': 'grid' === postLayout,
						[ `columns-${ columns }` ]: 'grid' === postLayout,
					} ) }
					key="recent-posts"
				>
					{ displayPosts.map( ( post ) => {
						return <li
							key={ post.id }
							style={ {
								...TextOptionsInlineStyles( this.props ),
							} }
						>
							{
								post._embedded !== undefined && post._embedded[ 'wp:featuredmedia' ] ? (
									<img
										src={ post._embedded[ 'wp:featuredmedia' ][ 0 ][ 'source_url' ] }
										alt=""
									/>
								) : (
									null
								)
							}
							<a href={ post.link }
								target="_blank">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
							<div
								dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } }
								style={ {
									...TextOptionsInlineStyles( this.props ),
								} } />
							{ displayPostDate && post.date_gmt &&
							<time dateTime={ moment( post.date_gmt ).utc().format() }
								className={ `${ this.props.className }__post-date` }>
								{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
							</time>
							}
						</li>;
					}
					) }
				</ul>
			</section>,
		];
	}
}

export default withSelect( ( select, props ) => {
	const { postsToShow, order, orderby, taxonomies } = props.attributes;
	const decodedTaxonomies = taxonomies ? JSON.parse( taxonomies ) : {};

	// This can be made to be much more flexible and allow for custom taxonomies and the like. Phase 2!
	const tags = decodedTaxonomies.post_tag && 0 < decodedTaxonomies.post_tag.length ? decodedTaxonomies.post_tag.map( tag => tag.id ) : undefined;
	const categories = decodedTaxonomies.category && 0 < decodedTaxonomies.category.length ? decodedTaxonomies.category.map( category => category.id ) : undefined;

	const { getEntityRecords } = select( 'core' );
	const latestPostsQuery = pickBy( {
		_embed: 'embed',
		orderby,
		order,
		tags,
		categories,
		per_page: postsToShow, // eslint-disable-line
	}, ( value ) => ! isUndefined( value ) );

	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
	};
} )( RecentPostsBlock );
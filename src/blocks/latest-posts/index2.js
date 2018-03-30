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
registerBlockType( 'wds/latest-posts222222222', {
	title: __( 'Latest Posts 2' ),
	description: __( 'Shows a grid of your site\'s most recent posts.' ),
	category: 'widgets',
	icon: 'grid-view',
	keywords: [ __( 'recent posts' ) ],
	supports: {
		html: false,
	},
	edit: class extends Component {
		render() {
			return <p>Hello Newman</p>;
		}
	},
	save: () => null,
} );

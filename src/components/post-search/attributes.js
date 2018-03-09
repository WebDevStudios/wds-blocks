/**
 * Set the attributes to be displayed in the Background Options panel.
 * @type {Object}
 */
const PostSearchAttributes = {
	images: {
		source: 'query',
		selector: '.url',
		query: {
			url: { source: 'attribute', attribute: 'src' },
			alt: { source: 'attribute', attribute: 'alt' },
		},
	},
};

export default PostSearchAttributes;

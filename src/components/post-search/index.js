// Import other functionality.
import { PostSearchAttributes } from './attributes';

// Export for ease of importing in individual blocks.
export { PostSearchAttributes };

/**
 * Internal block libraries
 */
const { URLInput } = wp.editor;

const { Dashicon } = wp.components;

/**
 * Creates a Post Search component.
 * @param  {object} props The object of attributes saved to a block.
 * @returns {mixed} The post search form.
 *
 * @author Corey Collins
 */
function PostSearch( props ) {
	const onChangeButtonURL = value => {
		props.setAttributes( { buttonUrl: value } );
	};

	return (
		<div>
			<form
				key="form-link"
				className="blocks-button__inline-link"
				onSubmit={ event => event.preventDefault() }
			>
				<Dashicon icon="admin-links" />
				<URLInput
					value={ props.attributes.buttonUrl }
					onChange={ onChangeButtonURL }
				/>
			</form>
		</div>
	);
}

export default PostSearch;

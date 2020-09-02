import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * The PreviewToggle component displays a toolbar button to toggle between "edit" and "preview" block modes.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] Properties passed to the component.
 * @return {WPElement}      Element to render.
 */
export default function PreviewToggle( props ) {
	const { showPreview = true, togglePreview } = props;

	return (
		<BlockControls>
			<ToolbarGroup>
				{ showPreview ? (
					<ToolbarButton
						icon="edit"
						label="Switch to Edit"
						onClick={ () => togglePreview() }
					/>
				) : (
					<ToolbarButton
						icon="welcome-view-site"
						label="Switch to Preview"
						onClick={ () => togglePreview() }
					/>
				) }
			</ToolbarGroup>
		</BlockControls>
	);
}

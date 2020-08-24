import edit from "./edit";
import save from "./save";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @link https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType("wdsblocks/rich-text-demo", {
	title: __("RichText Block", "wdsblocks"),
	icon: "edit",
	category: "common",
	keywords: [__("richtext", "wdsblocks")],
	attributes: {
		content: {
			type: "array",
			source: "children",
			selector: "p",
		},
	},
	edit,
	save,
});

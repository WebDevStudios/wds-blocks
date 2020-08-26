import { applyFilters } from '@wordpress/hooks';
// Global prefix
export const PREFIX = 'wdsblocks';

// Container Class (.container, .row, etc)
export const CONTAINER_CLASS = applyFilters(
	`${PREFIX}.container_class`,
	`${PREFIX}-container`
);

// Theme Background Palette
export const THEME_BKG_PALETTE = applyFilters(`${PREFIX}.theme_bkg_palette`, [
	{
		name: 'Coral',
		slug: 'coral',
		color: '#FF7F50',
	},
	{
		name: 'Lavender',
		slug: 'lavender',
		color: '#E6E6FA',
	},
	{
		name: 'Blue',
		slug: 'blue',
		color: '#6c97e0',
	},
	{
		name: 'White',
		slug: 'white',
		color: '#ffffff',
	},
]);

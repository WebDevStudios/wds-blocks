import { applyFilters } from '@wordpress/hooks';

export const PREFIX = 'wdsblocks';
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

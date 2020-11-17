import { applyFilters } from '@wordpress/hooks';

// Global block prefix
export const PREFIX = 'wdsblocks';

// Container Class (.container, .row, etc)
export const CONTAINER_CLASS = applyFilters(
	`${ PREFIX }.container_class`,
	`container`
);

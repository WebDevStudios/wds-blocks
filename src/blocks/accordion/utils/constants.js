import { applyFilters } from '@wordpress/hooks';
import { PREFIX } from '../../../utils/constants';

export const ALLOWED_BLOCKS = applyFilters(
	`${PREFIX}.accordion_allowed_blocks`,
	['core/image', 'core/heading', 'core/paragraph'] // Default value.
);

import { applyFilters } from '@wordpress/hooks';
import { PREFIX } from '../../../utils/constants';

export const ALLOWED_BLOCKS = applyFilters(
	`${PREFIX}.accordion_group_allowed_blocks`,
	['wdsblocks/accordion'] // Default value.
);

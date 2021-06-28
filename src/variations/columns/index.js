import { __ } from '@wordpress/i18n';
import icons from '../utils/icons';

/**
 * Register block variation.
 *
 * @author JC Palmes
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
wp.blocks.registerBlockVariation( 'core/columns', {
	name: __( 'services', 'wdsblocks' ),
	title: __( 'Services', 'wdsblocks' ),
	attributes: {
		align: 'wide',
		className: 'services-column',
	},
	icon: icons.services,
	scope: [ 'inserter' ],
	innerBlocks: [
		[
			'core/column',
			{},
			[
				[
					'core/group',
					{
						className: 'service-group',
						textColor: 'black',
					},
					[
						[
							'core/image',
							{
								align: 'center',
								className: 'service-image',
								url:
									'https://via.placeholder.com/300x200.png/09f/fff',
								height: 200,
								width: 300,
							},
						],
						[
							'core/heading',
							{
								className:
									'service-title has-text-align-center',
								level: 3,
								placeholder: __( 'Service Name', 'wdsblocks' ),
							},
						],
						[
							'core/paragraph',
							{
								align: 'center',
								className: 'service-content',
								placeholder: __(
									'Add Service Description',
									'wdsblocks'
								),
							},
						],
					],
				],
			],
		],
		[
			'core/column',
			{},
			[
				[
					'core/group',
					{
						backgroundColor: '',
						className: 'service-group',
						textColor: 'black',
					},
					[
						[
							'core/image',
							{
								align: 'center',
								className: 'service-image',
								url:
									'https://via.placeholder.com/300x200.png/09f/fff',
								height: 200,
								width: 300,
							},
						],
						[
							'core/heading',
							{
								className:
									'service-title has-text-align-center',
								level: 3,
								placeholder: __( 'Service Name', 'wdsblocks' ),
							},
						],
						[
							'core/paragraph',
							{
								align: 'center',
								className: 'service-content',
								placeholder: __(
									'Add Service Description',
									'wdsblocks'
								),
							},
						],
					],
				],
			],
		],
		[
			'core/column',
			{},
			[
				[
					'core/group',
					{
						backgroundColor: '',
						className: 'service-group',
						textColor: 'black',
					},
					[
						[
							'core/image',
							{
								align: 'center',
								className: 'service-image',
								url:
									'https://via.placeholder.com/300x200.png/09f/fff',
								height: 200,
								width: 300,
							},
						],
						[
							'core/heading',
							{
								className:
									'service-title has-text-align-center',
								level: 3,
								placeholder: __( 'Service Name', 'wdsblocks' ),
							},
						],
						[
							'core/paragraph',
							{
								align: 'center',
								className: 'service-content',
								placeholder: __(
									'Add Service Description',
									'wdsblocks'
								),
							},
						],
					],
				],
			],
		],
	],
} );

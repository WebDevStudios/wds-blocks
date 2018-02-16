<?php
/**
 * Automatically load all PHP files in the directory specified. Recursively.
 *
 * @author    Aaron Holbrook
 * @date      3.18.2015
 * @copyright MIT, Aaron Holbrook 2015
 * @link      https://github.com/AaronHolbrook/autoload/blob/master/autoload.php
 */

namespace AaronHolbrook\Autoload;

if ( ! function_exists( 'AaronHolbrook\Autoload\autoload' ) ) :

	/**
	 * Recursively loads all php files in all subdirectories of the given path
	 *
	 * @param $directory
	 */
	function autoload( $directory ) {

		// Get a listing of the current directory
		$scanned_dir = scandir( $directory );

		if ( empty( $scanned_dir ) ) {
			return;
		}

		// Ignore these items from scandir
		$ignore = array( '.', '..' );

		// Remove the ignored items
		$scanned_dir = array_diff( $scanned_dir, $ignore );

		foreach ( $scanned_dir as $item ) {

			$filename = $directory . '/' . $item;
			$real_path = realpath( $filename );

			if ( false === $real_path ) {
				continue;
			}

			$filetype = filetype( $real_path );

			if ( empty( $filetype ) ) {
				continue;
			}

			// If it's a directory then recursively load it
			if ( 'dir' === $filetype ) {

				autoload( $real_path );
			}

			// If it's a file, let's try to load it
			else if ( 'file' === $filetype ) {

				// Don't allow files that have been uploaded
				if ( is_uploaded_file( $real_path ) ) {
					continue;
				}

				// Don't load any files that are not the proper mime type
				if ( 'text/x-php' !== mime_content_type( $real_path ) ) {
					continue;
				}

				$filesize = filesize( $real_path );
				// Don't include empty or negative sized files
				if ( $filesize <= 0 ) {
					continue;
				}

				// Don't include files that are greater than 100kb
				if ( $filesize > 100000 ) {
					continue;
				}

				$pathinfo = pathinfo( $real_path );

				// An empty filename wouldn't be a good idea
				if ( empty( $pathinfo['filename'] ) ) {
					continue;
				}

				// Sorry, need an extension
				if ( empty( $pathinfo['extension'] ) ) {
					continue;
				}
				
				// Actually, we want just a PHP extension!
				if ( 'php' !== $pathinfo['extension'] ) {
					continue;
				}
				
				// Only for files that really exist
				if ( true !== file_exists( $real_path ) ) {
					continue;
				}

				if ( true !== is_readable( $real_path ) ) {
					continue;
				}

				require_once( $real_path );
			}
		}
	}

endif;

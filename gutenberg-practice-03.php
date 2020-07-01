<?php
/**
 * Plugin Name: Gutenberg Practice 03
 * Plugin URI: https://github.com/drill-lancer/gutenberg-practice-03
 * Description: Block Build Test
 * Version: 0.0.1
 * Author: DRILL LANCER
 *
 * @package Gutenberg Practice 01
 */

/**
 * Register Scripts
 */
function gutenberg_practice_03_register() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'gutenberg-practice-03',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	wp_register_style(
		'gutenberg-practice-03',
		plugins_url( 'style.css', __FILE__ ),
		array(),
		$asset_file['version']
	);

	register_post_meta(
		'post',
		'gutenberg_practice_03_block_field',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'string',
		)
	);
}
add_action( 'init', 'gutenberg_practice_03_register' );

/**
 * Enqueue Scripts
 */
function gutenberg_practice_03_enqueue() {
	wp_enqueue_style( 'gutenberg-practice-03' );
	wp_enqueue_script( 'gutenberg-practice-03' );
}
add_action( 'enqueue_block_editor_assets', 'gutenberg_practice_03_enqueue' );

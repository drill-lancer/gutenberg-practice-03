( function ( wp ) {
	const registerPlugin = wp.plugins.registerPlugin;
	const PluginSidebar = wp.editPost.PluginSidebar;
	const el = wp.element.createElement;
	const Text = wp.components.TextControl;
	const withSelect = wp.data.withSelect;
	const withDispatch = wp.data.withDispatch;
	const compose = wp.compose.compose;

	const MetaBlockField = compose(
		withDispatch( ( dispatch, props ) => {
			return {
				setMetaFieldValue: ( value ) => {
					dispatch( 'core/editor' ).editPost( {
						meta: { [ props.fieldName ]: value },
					} );
				},
			};
		} ),
		withSelect( ( select, props ) => {
			return {
				metaFieldValue: select( 'core/editor' ).getEditedPostAttribute(
					'meta'
				)[ props.fieldName ],
			};
		} )
	)( ( props ) => {
		return el( Text, {
			label: 'Meta Block Field',
			value: props.metaFieldValue,
			onChange: ( content ) => {
				props.setMetaFieldValue( content );
			},
		} );
	} );

	registerPlugin( 'gutenberg-practice-03-sidebar', {
		render: () => {
			return el(
				PluginSidebar,
				{
					name: 'gutenberg-practice-03-sidebar',
					icon: 'admin-post',
					title: 'My Plugin sidebar',
				},
				el(
					'div',
					{ className: 'plugin-sidebar-content' },
					el( MetaBlockField, {
						fieldName: 'gutenberg_practice_03_block_field',
					} )
				)
			);
		},
	} );
} )( window.wp );

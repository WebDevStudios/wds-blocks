const { Component } = wp.element;

class Search extends Component {
	constructor( props ) {
		super( props );

		this.apiQueryURL = ( query ) => wpApiSettings.root + `wp/v2/posts?search=${ query }&filter[posts_per_page]=-1`;

		this.setQuery = this.setQuery.bind( this );
		this.debounce = this.debounce.bind( this );
		this.handleKeyPress = this.handleKeyPress.bind( this );
		this.fetchQueryData = this.fetchQueryData.bind( this );

		// Await changes — debounce - before making query in input.
		this.fetchQueryData = this.debounce( this.fetchQueryData, 1000 );
	}

	setQuery( e ) {
		this.fetchQueryData( e.target.value );
	}

	fetchQueryData( queryString ) {
		window.fetch( this.apiQueryURL( queryString ) )
			.then( response => {
				return response.json();
			} )
			.then( response => {
				return this.props.onQueryChange( response );
			} );
	}

	// https://davidwalsh.name/javascript-debounce-function
	debounce( func, wait, immediate ) {
		var timeout;

		return function() {
			let context = this;
			let args = arguments;

			let later = function() {
				timeout = null;
				if ( ! immediate ) {
					func.apply( context, args );
				}
			};

			let callNow = immediate && ! timeout;

			clearTimeout( timeout );
			timeout = setTimeout( later, wait );

			if ( callNow ) {
				func.apply( context, args );
			}
		};
	}

	handleKeyPress( event ) {
		// Disable enter search.
		if ( event.key === 'Enter' ) {
			event.preventDefault();
		}
	}

	render() {
		return (
			<form>
				<input className="search-form" type="text" onChange={ this.setQuery } onKeyPress={ this.handleKeyPress } />
			</form>
		);
	}
}

export default Search;

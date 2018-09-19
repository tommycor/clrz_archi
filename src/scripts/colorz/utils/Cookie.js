class Cookie {

	constructor() {
		this.unwanteds = this.getUnwanted();
		this.clearUnwanted();
	}

	set( name, value, expire, path ) {

		if( name === void 0 ) {
			console.warn('Name needs to be defined');
			return;
		}
		if( value === void 0 ) {
			console.warn('Value needs to be defined');
			return;
		}
		if( expire !== void 0 ) {
			if( !(expire instanceof Date) ) {
				console.warn('Date needs to be a Date object');
				return;
			}
		}
		else {
			expire = null;
		}

		if( this.unwanteds != null && this.unwanteds.indexOf(name) >= 0 ) {
			console.warn(name + ' cookie is unwanted');
			return;
		}

		value = JSON.stringify( value );

		let cookie = name + '=' + value + ';';
		cookie 	  += expire == null ? '' : ' expires=' + expire.toGMTString();
		cookie 	  += path == null ? ' path=/;' : ' path=/' + path + ';';

		document.cookie = cookie;

		return this.get();
	}

	get( name ) {
		let cookies = this.factoryCookies();

		if( name != void 0 ) {
			return this.getCookieByName( name, cookies );
		}

		return cookies;
	}

	delete( name ) {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
	}






	clearUnwanted() {
		if( this.unwanteds == null ) {
			return;
		}

		for( let i = 0 ; i < this.unwanteds.length ; i++ ) {
			this.delete( this.unwanteds[i] );
		}
	}

	getUnwanted() {
		let cookie = this.get( 'unwantedCookies' );

		if( cookie !== null ) {
			return JSON.parse( cookie );
		}
		else {
			return null;
		}
	}

	factoryCookies() {
		let parts 	= decodeURIComponent( document.cookie ).split("; ");
		let cookies = new Array();

		for( let i = 0 ; i < parts.length ; i++ ) {
	        while (parts[i].charAt(0) == ' ') {
	            parts[i] = parts[i].substring(1);
	        }

			let res = parts[i].split("=");

			cookies.push({
				name: res[0],
				value: res[1]
			})
		}

		return cookies;
	}

	getCookieByName( name, list ) {
		for( let i = 0 ; i < list.length ; i++ ) {
			if( list[i].name === name ) {
				return list[i].value;
			}
		}
		return null;
	}

}

export default new Cookie();
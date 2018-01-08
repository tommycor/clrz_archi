module.exports = class AJAX {
	constructor( url, success, failure, method, data, contentType, isResponseXML ) {
		this.onReady 	= this.onReady.bind( this );
		this.onSent 	= this.onSent.bind( this );
		this.send 		= this.send.bind( this );
		
		if( url === void 0 ) { return; }

		this.url 			= url;
		this.method 		= method !== void 0 ? method : 'GET';
		this.httpRequest 	= new XMLHttpRequest();
		this.data			= data !== void 0 ? data : '';
		this.success		= success !== void 0 ? success : '';
		this.failure		= failure !== void 0 ? failure : '';
		this.isResponseXML	= isResponseXML !== void 0 ? isResponseXML : true;
		this.contentType	= contentType !== void 0 && contentType !== null ? contentType : 'application/x-www-form-urlencoded';
	}

	send() {
		this.httpRequest.onreadystatechange = this.onReady;

		this.httpRequest.open(this.method, this.url, true);

		this.httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
		this.httpRequest.setRequestHeader("cache-control", "no-cache");
		this.httpRequest.setRequestHeader('Content-Type', this.contentType);
		this.httpRequest.send( this.data );
	}

	onReady() {
		if( this.httpRequest.readyState === 4 ) {
			this.onSent();
		}
	}

	onSent() {
		if ( this.httpRequest.status === 200 ) {
			if( this.isResponseXML ) {
				this.success( this.httpRequest.responseXML );
			}
			else {
				this.success( this.httpRequest.responseText );
			}
		}
		else {
			if( this.isResponseXML ) {
				this.failure( this.httpRequest.responseXML );
			}
			else {
				this.failure( this.httpRequest.responseText );
			}
		}
	}

	serialize( form ) {
		var field, s = [];
		if (typeof form == 'object' && form.nodeName == "FORM") {
			let len = form.elements.length;
			for ( let i = 0 ; i < len ; i++ ) {
				field = form.elements[i];

				if (field.name &&
					!field.disabled &&
					field.type != 'file' &&
					field.type != 'reset' &&
					field.type != 'submit' &&
					field.type != 'button' ) {

					if ( field.type == 'select-multiple' ) {
						for ( let j = form.elements[i].options.length-1 ; j>=0 ; j-- ) {
							if( field.options[j].selected ) {
								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
							}
						}
					}
					else if ( ( field.type != 'checkbox' && field.type != 'radio' ) || field.checked ) {
						s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
					}
				}
			}
		}

		return s.join('&').replace(/%20/g, '+');
	}
}

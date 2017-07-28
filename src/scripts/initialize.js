import $ from "jquery";
import Test from './test/Test'


var item = document.querySelectorAll('.js-test');

for( let i = 0 ; i < item.length ; i++ ) {
	let test = new Test( item[i] );
}
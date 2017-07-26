import $ from "jquery";
import Test from './test/Test'

let item = document.querySelectorAll('.js-test');

for( let i = 0 ; i < item.length ; i++ ) {
	let test = new Test( item[i] );
}
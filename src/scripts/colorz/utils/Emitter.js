import { EventEmitter } from 'emitter';

var emitter = new EventEmitter()
// to allow infinite numbers of listener
// but don't add infinite number of listeners
emitter.setMaxListeners(0);

module.exports = emitter;
module.exports = function mapper(val, oMin, oMax, nMin, nMax) {
	var val = val - oMin;
	var oMax = oMax - oMin;
	var nMax = nMax - nMin;
	var res = ( ( val * nMax ) / oMax ) + nMin;

	return res;
}
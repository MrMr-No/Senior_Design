var b = require('bonescript');

module.exports = {
		AnalogValue: function(){
			b.analogRead('P9_40',printAIN1);
		};
};

function printAIN1(x) {
    console.log('x.value = ' + x.value* 1.8);
    console.log('x.err = ' + x.err);
    return x.value
};
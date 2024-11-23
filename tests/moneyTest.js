import formatCurrency from "../scripts/utils/money.js";

console.log('test suite: formatCurrency'); //test suite name -> Groups of tests is called test suite

console.log('converts cents into dollars'); //test case name

if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with zero');

if(formatCurrency(0) === '0.00'){
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds up with nearest cent');

if(formatCurrency(2000.5) === '20.01'){
    console.log('passed');
} else {
    console.log('failed');
}

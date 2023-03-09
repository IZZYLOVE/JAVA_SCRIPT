let num = 200;
let result = toString(num);
console.log('using toString()');
console.log(result);
console.log(typeof result);

num = '200';
result = Number(num);
console.log('using number()');
console.log(result);
console.log(typeof result);

num = 200.89;
result = parseFloat(num);
console.log('using parseFloat()');
console.log(result);
console.log(typeof result);

num = 200.89;
result = parseInt(num);
console.log('using parseInt()');
console.log(result);
console.log(typeof result);

num = 20.77555777;
result = num.toFixed();
console.log('using toFix()');
console.log(result);
console.log(typeof result);

num = 20.77555777;
result = num.toFixed(3);
console.log('using toFix()');
console.log(result);
console.log(typeof result);

num = 20.77555777;
result = num.toExponential();
console.log('using toExponential()');
console.log(result);
console.log(typeof result);

num = 20.77555777;
result = num.toExponential(2);
console.log('using toExponential(3)');
console.log(result);
console.log(typeof result);

num = 20.77555777;
result = num.toExponential(5);
console.log('using toExponential(5)');
console.log(result);
console.log(typeof result);

num = 20.77555777;
result = num.toPrecision(5);
console.log('using toPrecision(5)');
console.log(result);
console.log(typeof result);

num = 20.44444444;
result = num.toPrecision(5);
console.log('using toPrecision(5)');
console.log(result);
console.log(typeof result);

num = 20.44444444;
result = num.toLocaleString(8);
console.log('using toLocaleString(8)');
console.log(result);
console.log(typeof result);

num = 20.44444444;
result = num.toLocaleString();
console.log('using toLocaleString()');
console.log(result);
console.log(typeof result);


num = 20.44444444;
result = Number.isInteger(num);
console.log('using isInteger() returns boolean');
console.log(result);
console.log(typeof result);

num = 20.44444444;
result = Number.isSafeInteger(num);
console.log('using isSafeInteger() returns boolean');
console.log(result);
console.log(typeof result);

num = 20.44444444;
result = Number.isSafeInteger(num);
console.log('using isSafeInteger() returns boolean');
console.log(result);
console.log(typeof result);
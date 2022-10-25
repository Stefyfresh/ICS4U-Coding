let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

// join
// console.log(fruits.join());
// console.log(fruits.join("--"));

// push
// fruits.push("Kiwi"); //push string onto the array
// console.log(fruits.join());
// fruits.push(["Strawberry", "Blueberry"]); //push array onto the array
// console.log(fruits.join());
// fruits.push(5);
// console.log(fruits.join());

//pop
// console.log(fruits.pop());
// console.log(fruits.join());

//shift
// console.log(fruits.join());
// console.log(fruits.shift());
// console.log(fruits.join());

//unshift
// fruits.unshift("Potato");
// console.log(fruits.join());

//concat
// fruits = fruits.concat(["Strawberry", "Blueberry"]);
// console.log(JSON.stringify(fruits));

// slice
// fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// let citrus = fruits.slice(1, 3);
// console.log(citrus); 
// console.log(fruits); 

//splice
fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi"); //splice(where, removeNum, elems...)
console.log(fruits);

fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango", "Pineapple", "Cherry"];
fruits.splice(2, 1, "Lemon", "Kiwi");
console.log(fruits);

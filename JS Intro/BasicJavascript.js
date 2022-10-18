// Declare variables
// Var vs let vs const

// var greeting = "Hello"; // no use var pls
// // function test(){
//     if(true){
//         var greeting = 'Hi';
//     }
// }

// let greeting = "Hello";
// function test(){
//         if(true){
//             var greeting = 'Hi';
//         }
//     }

// console.log(greeting);

// const TEST_VALUE = 6;
// TEST_VALUE = 5;

// == vs ===
// === compares value and type
// console.log(1=='1'); //true
// console.log(1 === '1'); //false
// console.log(1 == true); //true
// console.log(1 === true); //false
// console.log(typeof(1));
// console.log(typeof(true));

// !+= compares values and ensures that they are not the same

// let n1 = 6;
// let n2 = 7;
// let sum = n1 + n2;


// const result = n1 + " + " + n2 + " = " + sum;
// // console.log(result);

// const result2 = `${n1} + ${n2} = ${sum}`;
// console.log(result2);

// functions (assign functions)
// function addTwo(x) {
//     return x + 2;
// }

// console.log(addTwo(5));

// function add(x, y, z) {
//     return x + y + (typeof(z) === 'undefined' ? 0 : z);
// }

// console.log(add(1, 2, 3));
// console.log(add(1, 2));


// let num = 6;
// // Ternary operator
// // Condition ? true : false
// console.log(num % 2 == 0 ? 'Even' : 'Odd');


// For loop
// for (let index = 0; index < 7; index++) {
//     console.log(index);
// }

// Arrays
// for .. of iterates over property values

// const COLOURS = ['red', 'yellow', 'green', 'blue'];
// for (const colour of COLOURS) {
//     console.log(colour);
// }

// for .. in iterates over property values
// const car = {make : 'Ford', model : "mustang"};
// for (const prop in car) {
//     console.log(`${prop}: ${car[prop]}`);
// }

const room = {
    "id": "Tarnished Fountain",
    "name": "Tarnished Fountain",
    "description": "You marvel at a broken-down fountain, with worthless, scattered coins upon it. You see a shabby-looking bridge further north.",
    "exits": [
      {
        "isLocked": false,
        "direction": "North",
        "adjacentRoom": "Bridge of Lost Souls"
      },
      {
        "isLocked": false,
        "direction": "East",
        "adjacentRoom": "Town Plaza"
      },
      {
        "isLocked": false,
        "direction": "West",
        "adjacentRoom": "Plaza Outskirts"
      }
    ]
  }

  for (const key in room) {
    if(key !== 'exits'){
        console.log(`${key}: ${room[key]}`);
    }
    else {
        console.log("\nExits:");
        for (const exit of room[key]) {
            for (const exitProp in exit) {
                console.log(`${exitProp}: ${exit[exitProp]}`);
            }
        }
    }
  }


'use strict';

// function calcAge(birthYear) {
//     const age = 2022 - birthYear;

//     function printAge() {
//         const output = `${firstName}, You are ${age}. You were born in ${birthYear}.`;
//         console.log(output);

//         if(birthYear >= 1981 && birthYear <= 1996) {
//             var millenial = true;
//             const str = `Oh, ${firstName}, you're a millenial.`;
//             console.log(str);

//             function add(a, b) {
//                 return a + b;
//             }
//         }
//         // console.log(add(158, 6)); Functions are blocked scoped in strict mode. The funstion will remain undefined 
//         // if called while in strict mode.
        
//         console.log(millenial);
//     }
//     printAge();
//     console.log(firstName);
//     return age;
// }

// const firstName = "Huss";
// calcAge(1990);


// // Variable TDZ
// // console.log(job); // var will be undeifned if they are being hoisted
// // console.log(race); // let and const will be uninitialized if they are hoisted 
// // console.log(year);


// var job = "teacher";
// let race = "Mexican";
// const year = 1990;


// // Function TDZ

// console.log(addDeco(5, 5));
// console.log(addNums(10, 5));
// console.log(addDeci(15, 5));

// function addDeco(a, b) {
//     return a + b;
// }

// const addNums = function(a, b) {
//     return a + b;
// }

// const addDeci = (a, b) => a + b;

// Primitive and Reference Types (Primitive vs Objects)

// Primitive Type
// let lastName = "Guevara";
// let newLastName = lastName;
// lastName = "Zarate";
// console.log(lastName, newLastName);


// Reeference Type
// const jazmin = {
//     lastName : "Lopez",
//     age : 31
// }

// const marriedJazmin = jazmin;
// marriedJazmin.lastName = "Guevara";
// console.log("Old Jazmin:", jazmin);
// console.log("New Jazmin:", marriedJazmin);

// Copying Objects

const jazmin2 = {
    firstName : "Jazmin",
    lastName : "Lopez",
    age : 31,
    family : ["John, Jessica"],
};

const jazminCopy = Object.assign({}, jazmin2);
jazminCopy.lastName = "Guevara";
jazminCopy.family.push("Damien");
jazminCopy.family.push("Mike");
console.log("Old Jazmin:", jazmin2);
console.log("New Jazmin:", jazminCopy);
'use strict';


const bookings = [];
const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
    // ES5 Default Values
    // numPassengers = numPassengers || 1; 
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking);
};

// createBooking("AC122");
// createBooking("AC122", 2, 300);
// createBooking("AC122", 10);
// createBooking("AC122", 5);
// createBooking("AC122", undefined, 300);

// Arguments

const flight = "LH234";
const hussein = {
    name: "Hussein Guevara",
    passport: 985656541
};

const checkIn = function(flightNum, passenger) {
    flightNum = "LH999";
    passenger.name = "Mr." + passenger.name;

    if(passenger.passport === 985656541) {
        alert("Checked In!");
    } else {
        alert("Wrong Passport!");
    }
};

// checkIn(flight, hussein);
// console.log(hussein);
// console.log(flight);

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 1000000000)
};

// newPassport(hussein);
// checkIn(flight, hussein);

// Accepting Callback Functions

const oneWord = function(str) {
    return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(" ");
    return [first.toUpperCase(), ...others].join(" ");
};

// Higher-Order Function
const transformer = function(str, fn) {
    // console.log(`Original String: ${str}`);
    // console.log(`Transformed string: ${fn(str)}`);
    // console.log(`Called by: ${fn.name}`);
}

transformer("JavaScript is the best!", upperFirstWord);

const high5 = function() {
    // console.log("Hello!")
}
document.body.addEventListener("click", high5);

// Returning Functions

const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet("Hey");
// greeterHey("Huss");
// greeterHey("Jazz");

// Call and Apply Methods

const alaska = {
    airline: "AlasKa",
    iateCode: "Ak",
    bookings: [],
    booK(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iateCode}${flightNum}`);
        this.bookings.push({fligth: `${this.iateCode}${flightNum}`, name});
    }
}

alaska.booK(289, "Hussein");
// console.log(alaska);

const southWest = {
    airline: "SouthWest",
    iateCode: "SW",
    bookings: [],
}

const book = alaska.booK;

// The this keyword only wokrs in the object's scope; Does not work to call book method;
// book(547, "Hussein");

// Call
book.call(alaska, 474, "Hussein"); // Use call() this target the object you want 
console.log(alaska);

book.call(southWest, 666, "Jaz");
console.log(southWest);

const swiss = {
    airline: "Swiss Air Lines",
    iateCode: "SAL",
    bookings: []
}

book.call(swiss, 777, "Jose");
console.log(swiss);

// Apply Method

const flightData = [781, "John Cena"]; // apply() arguments are where the this keywaord is pointing and an array
book.apply(swiss, flightData);
console.log(swiss);

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
    return a + b;
}

/** @type {string} */
let name = "John";

/** @type {number} */
let age = 30;

/** @type {boolean} */
let isActive = true;

/**
 * @param {string} person
 * @returns {string}
 */
function greet(person) {
    return "Hello, " + person;
}

/**
 * @param {number[]} numbers
 * @returns {number}
 */
function sumArray(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

/**
 * @param {string[]} names
 * @returns {string}
 */
function joinNames(names) {
    return names.join(", ");
}

/**
 * @param {number} x
 * @returns {number}
 */
function square(x) {
    return x * x;
}

/**
 * @param {number} base
 * @param {number} height
 * @returns {number}
 */
function calculateTriangleArea(base, height) {
    return (base * height) / 2;
}

/** @type {string[]} */
let colors = ["red", "green", "blue"];

/**
 * @param {string} color
 * @returns {boolean}
 */
function isColorInArray(color) {
    return colors.includes(color);
}

/**
 * @param {number} radius
 * @returns {number}
 */
function calculateCircleArea(radius) {
    return Math.PI * radius * radius;
}

/** @type {number[]} */
let numbers = [1, 2, 3, 4, 5];

/**
 * @returns {number}
 */
function getMaxNumber() {
    return Math.max(...numbers);
}

/** @type {boolean} */
let isLoggedIn = false;

/**
 * @param {boolean} status
 */
function setLoginStatus(status) {
    isLoggedIn = status;
}

/**
 * @param {string} name
 * @param {number} age
 * @param {boolean} isActive
 * @returns {string}
 */
function createUser(name, age, isActive) {
    return `User: ${name}, Age: ${age}, Active: ${isActive}`;
}

/** @type {Object} */
let car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    isRunning: false
};

/**
 * @param {Object} car
 */
function startCar(car) {
    car.isRunning = true;
}

/**
 * @param {Object} car
 */
function stopCar(car) {
    car.isRunning = false;
}

/**
 * @param {string} day
 * @returns {boolean}
 */
function isWeekend(day) {
    return day === "Saturday" || day === "Sunday";
}

/**
 * @param {number} year
 * @returns {boolean}
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function multiply(x, y) {
    return x * y;
}

/**
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
    return str.split("").reverse().join("");
}

/**
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

/**
 * @param {string[]} items
 * @returns {string}
 */
function listItems(items) {
    return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

/**
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
    const reversed = str.split("").reverse().join("");
    return str === reversed;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

/**
 * @param {string} password
 * @returns {boolean}
 */
function validatePassword(password) {
    return password.length >= 8 && /\d/.test(password);
}

/** @type {number[]} */
let grades = [85, 90, 78, 92, 88];

/**
 * @returns {number}
 */
function getAverageGrade() {
    return sumArray(grades) / grades.length;
}

/** @type {Array<{ name: string, age: number }>} */
let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

/**
 * @param {string} name
 * @returns {number}
 */
function getPersonAge(name) {
    const person = people.find(p => p.name === name);
    return person ? person.age : -1;
}

/**
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
function calculateRectangleArea(width, height) {
    return width * height;
}

/**
 * @param {number[]} nums
 * @returns {number[]}
 */
function getEvenNumbers(nums) {
    return nums.filter(num => num % 2 === 0);
}

/** @type {string[]} */
let fruits = ["apple", "banana", "cherry"];

/**
 * @param {string} fruit
 * @returns {boolean}
 */
function isFruitInList(fruit) {
    return fruits.includes(fruit);
}

/** @type {Object} */
let book = {
    title: "1984",
    author: "George Orwell",
    pages: 328
};

/**
 * @param {Object} book
 * @returns {string}
 */
function getBookInfo(book) {
    return `${book.title} by ${book.author}, ${book.pages} pages`;
}

'use strict';
// DOM Manipilation: The Dom links the HTML to JavaScript for manipulation. It is not a part of JS.


// Score
document.querySelector('.score').textContent = 0;
// Score Counter
let scoreCounter = 0;

// Timer Display Slot
const timeDisplay = document.querySelector('.time');

// Reload Entire page -- Reset Btn
document.querySelector('.reset').addEventListener('click', function () {
    // This resets everything on the page
    location.reload();
});



// Make color Inverse Function for 1 sec
const colorSwitch = function () {

    document.body.classList.add("dark-mode");

    //Revert after 1 sec
    setTimeout(() => {
        document.body.classList.remove("dark-mode");
    }, 500);

};

// check Btn
let checkBtn = document.querySelector('.btnState');


// Random Number Generator
let luckyNumber = Number(Math.round(Math.random() * 25));

// Set the starting countDown time in seconds
let countDownTime = 60;

// Set chances count
let chancesCount = 8;
// Chances left variable correctly
let chanceLeft = chancesCount;
// Pass Count to Dom
document.querySelector('.chanceLeft').textContent = chanceLeft;

// Confetti Gif
const gifVisibility = document.querySelector('.gifImg');

// Function to Toggle Gif Visibility
const toggleGifVisibility = function () {
    // Make visible
    gifVisibility.classList.remove('hidden');
    // Change bg-color green
    // document.querySelector('body').style.backgroundColor = '#40c916';
    document.body.classList.add("green");

    // Impliment after 3 sec
    setTimeout(() => {

        // Hide Confetti
        gifVisibility.classList.add('hidden');
        // Change bg-color black
        // document.querySelector('body').style.backgroundColor = '#222';
        document.body.classList.remove("green");
    }, 3000);
};

// Make Button Disabled
const btnDisabled = function () {
    // Disable CheckBtn
    checkBtn.disabled = true;
    // Displey Disable on CheckBtn
    checkBtn.textContent = 'Disabled';
    // Change cursor to not-allowed
    checkBtn.style.cursor = 'not-allowed';
};

// Update Dom on Game state
const msgDisplayed = function (message) {
    document.querySelector('.message').textContent = message;
}


// Check Event Listener
document.querySelector('.check').addEventListener('click', function () {
    let checkValue = Number(document.querySelector('.guess').value);

    console.log(`The lucky is: ${luckyNumber}.`);

    if (document.querySelector('.guess').value === '') {
        // Done this way because even when empty checkValue is still being validated to number due to Num. Method. default "0"
        msgDisplayed('⛔ Enter a Number!');

        // Invert Color Function
        colorSwitch();

    } else if (checkValue === luckyNumber) {
        msgDisplayed('Congratulations 🎊 ...Continue Playing 👍');

        // Score Counter Increase
        scoreCounter++;
        document.querySelector('.score').textContent = scoreCounter;

        // Cofetti display & bg-Color function
        toggleGifVisibility();


        // Set another game
        replay();

    } else if (Math.abs(checkValue - luckyNumber) < 4) {
        // abs: returns an absolute no.-ve/+ve
        // condition; if the value diffrence is less than 4
        msgDisplayed('👌 You are quite close');

        // Invert Color Function
        colorSwitch();

    } else {
        msgDisplayed('🚫 Wrong, Try Again!');

        // Invert Color Function
        colorSwitch();
    };

    // Decrement the chance count for every click event
    chanceLeft--;

    if (chanceLeft > 0) {

        // update Displayed Chances
        document.querySelector('.chanceLeft').textContent = chanceLeft;

    }
    else if (chanceLeft === 0) {

        // Displays Game Over
        msgDisplayed('🚫 Game Over!');


        // update Displayed Chances to Show
        document.querySelector('.chanceLeft').textContent = 'Exhausted!';

        // Stop the timer when count down reaches zero
        clearInterval(timerInterval);
        // Update Dom to stop at current count down value
        timeDisplay.textContent = countDownTime;

        // display Answer
        document.querySelector('.number').textContent = luckyNumber;

        // disable Btn Function
        btnDisabled();
    };


});

// Timer Function

const updateCountDown = function () {

    if (countDownTime >= 0) {
        // Update Dome with current count down value
        timeDisplay.textContent = countDownTime;

        //Decrement the count down value by 1
        countDownTime--;
    } else {
        // Displays Game Over
        msgDisplayed('🚫 Game Over!');

        // Stop the timer when count down reaches zero
        clearInterval(timerInterval);
        timeDisplay.textContent = 'Time up!';

        // display Answer
        document.querySelector('.number').textContent = luckyNumber;

        // disable Btn Function
        btnDisabled();
    }

};

// call the updateCountDown function every 1,000 millisecond (1 second)
let timerInterval = setInterval(updateCountDown, 1000);


// ======== Replay Game

const replay = function () {

    // Clear any existing interval to prevent multiple timers
    clearInterval(timerInterval);

    // Reset the lucky number
    luckyNumber = Number(Math.round(Math.random() * 20));

    // Reset the countdown timer
    countDownTime = 60;
    // Update Dom
    timeDisplay.textContent = countDownTime;

    // call the updateCountDown function every 1 second
    timerInterval = setInterval(updateCountDown, 1000);

    // Reset chances to 8
    chanceLeft = chancesCount + 1;

    // Clear the input
    document.querySelector('.guess').value = '';

};




// =============================== NOTES


// AddEventListener(): is a method and a special kind of function because as a second argument you pass in an event handler function { a function as a second argument }

// Note" A function is a 'value'; therefore can be passed into an argument like a 'string' or a 'number'.


// setInterval():  a built-in JS function that repeatedly calls a specific function at a given time interval. It continues to run the function at regular intervals until you manually stop it.

// const timerInterval: The setInterval() function returns an ID (called a timer ID), which is stored in the timerInterval variable. This ID is used to reference the interval so that it can be cleared (stopped) later if needed. 

// clearInterval(): This function is used to stop an interval that was previously established by setInterval(). It takes the ID returned by setInterval() as an argument, which is timerInterval in this case.



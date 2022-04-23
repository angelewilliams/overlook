//♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢ Imports ♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢//
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/overlook-logo.png'
// This is the JavaScript entry file - your code begins here

//♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢Query Selectors♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢//
const myReservations = document.querySelector(".reservations");
const bookRoom = document.querySelector(".plan-booking-area");

const upcomingBookings = document.querySelector(".upcoming-bookings");
const upcomingBookingsArea = document.querySelector(".upcoming-bookings-area");

const pastBookings = document.querySelector(".past-bookings");
const pastBookingsArea = document.querySelector(".past-bookings-area");

const currentBookings = document.querySelector(".current-bookings");
const currentBookingsArea = document.querySelector(".current-bookings-area");

const homeButton = document.querySelector(".home");
const bookTravelButton = document.querySelector(".book-travel-button");
const calculateTravelButton = document.querySelector(".calculate-cost-button");
const loginSubmitButton = document.querySelector(".submit-button");

const startDate = document.querySelector(".date-picker");
const estimatedTripCost = document.querySelector(".estimated-trip-cost");
const bookTripForm = document.querySelector(".book-trip-form");

const userView = document.querySelector(".user-view");
const loginPage = document.querySelector(".login-page");
const navbar = document.querySelector(".nav-bar");

// const usernameInput = document.querySelector(".username");
// const passwordInput = document.querySelector(".password");

//♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢Event Listeners♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢//
// window.onload()

//♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢Event Handlers♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢♢//

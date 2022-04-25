//------------------ Imports -------------------
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/overlook-logo.png';
import {
  customersAPI,
  roomsAPI,
  bookingsAPI,
  getRequest,
  postRequest
} from './apiCalls';
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';

//------------------Query Selectors-------------------
const topNav = document.getElementById('topNav')
const userBookingDashboard = document.getElementById('bookingsDashboard');
const message = document.getElementById('message')

const bookingsDashboard = document.getElementById('bookingsDashboard');

const currentBookings = document.getElementById('currentBookings');
const upcomingBookings = document.getElementById('.upcomingBookings');
const pastBookings = document.getElementById('.pastBookings');

const startDate = document.querySelector('.date-picker');
const bookRoomForm = document.getElementById('bookRoomForm');

const userView = document.querySelector('.user-view');
const loginPage = document.querySelector('.login-page');
const loginSubmitButton = document.querySelector('.submit-button');
// const usernameInput = document.querySelector('.username');
// const passwordInput = document.querySelector('.password');
//------------------Global Variables -----------------
let customersData;
let bookingsData;
let roomsData;
let currentUser;
let overlookHotel;
let getData;
let postData;
//------------------API CALLS -----------------
const fetchData = () => {
  Promise.all([customersAPI, roomsAPI, bookingsAPI, getRequest, postRequest])
    .then(data => {
      handleData(data)
    });
};


//------------------Event Listeners------------------

window.addEventListener('load', fetchData());

//------------------Event Handlers-------------------
const loadOverlook = (customersData, roomsData, bookingsData, getData, postData) => {
  let i = Math.floor(Math.random() * customersData.length);
  let customer = new Customer(customersData[i], bookingsData, roomsData);
  loadCustomerDashboard(customer);
  // let hotel = new Hotel(customersData, bookingsData, roomsData);
  console.log(customer)
  // console.log(new Date ())


  // createEventListeners(customer, customersData, roomsData, bookingsData, postData, getData);
};

const handleData = (data) => {
  customersData = data[0];
  roomsData = data[1];
  bookingsData = data[2];
  getData = data[3];
  postData = data[4];
  loadOverlook(customersData, roomsData, bookingsData, getData, postData);
};

// const updateBookings = (e) => {
//     e.preventDefault();
//     getAllData(chosenUserID);
// }
//
const loadCustomerDashboard = (customer) => {
  customer.bookings.forEach((booking) => {
     let today = new Date();
     let bookingDate = new Date(booking.date);
     if (bookingDate < today) {
      //add this to my past booking
      //PAST
      currentBookings.innerHTML+= bookingPreview(booking)

     } else if (bookingDate > today){
       //UPCOMING


    } else if (bookingDate > today) {
      //CURRENT


    }

  })

}

// let current = customer.getCurrentBookings();
// let upcoming = customer.getUpcomingBookings();
// let past = customer.getPastBookings();
// displayBookings(current, upcoming, past);

// const displayBookings = (current, upcoming, past) => {
//
//   // currentBookings.innerHTML = `<h2>Current Bookings</h2>`;
//   // pastBookings.innerHTML = `<h2>Previous Bookings</h2>`;
//   // upcomingBookings.innerHTML = `<h2>Upcoming Bookings</h2>`;
//
//   if(current.length) {
//     current.forEach( (booking) => {
//       return currentBookings.innerHTML+= bookingPreview(current)\\
//     });
//   }
//
//   if(upcoming.length) {
//     upcoming.forEach((booking) => {
//       return upcomingBookings.innerHTML += bookingPreview(upcoming)
//     });
//   }
//
//   if(past.length) {
//     past.forEach((booking) => {
//       pastBookings.innerHTML += bookingPreview(past)
//     });
//   }
//
// };

const bookingPreview = (booking) => {
  // let resType = booking.roomType
  // let bookingTotal = booking.cost.toFixed(2);
    // Math.floor(booking.cost) * 1.1);
    return `
      <div class="booking-preview">
        <p>Date: ${booking.date}</p>
        <p>${booking.roomType} with ${booking.numBeds} bed(s)</p>
        <p>Total: $${booking.cost}</p>
      </div>`
};

const displayMessage = () => {
  message.innerText = '';

}

export {
  displayMessage
};

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
const userBookRoomView = document.getElementById('userBookRoomView');

const customerTotalSpend = document.getElementById('customerTotalSpend');
const currentBookings = document.getElementById('currentBookings');
const upcomingBookings = document.getElementById('upcomingBookings');
const pastBookings = document.getElementById('pastBookings');

const myBookingsNav = document.getElementById('myBookings');
const bookARoomNav = document.getElementById('bookARoom');
const logoutNav = document.getElementById('logout');

const startDate = document.querySelector('.date-picker');
const bookRoomForm = document.getElementById('bookRoomForm');

const userView = document.querySelector('.user-view');
const loginPage = document.querySelector('.login-page');
const loginSubmitButton = document.querySelector('.submit-button');

//------------------Global Variables -----------------
let customersData;
let bookingsData;
let roomsData;
let currentUser;
let overlookHotel;
let getData;
let postData;

//-------------------------APIs------------------------
const fetchData = () => {
  Promise.all([customersAPI, roomsAPI, bookingsAPI, getRequest, postRequest])
    .then(data => {
      handleData(data)
    });
};
const handleData = (data) => {
  customersData = data[0];
  roomsData = data[1];
  bookingsData = data[2];
  getData = data[3];
  postData = data[4];
  loadOverlook(customersData, roomsData, bookingsData, getData, postData);
  createEventListeners(customersData, roomsData, bookingsData, getData, postData);
};

const loadOverlook = (customersData, roomsData, bookingsData, getData, postData) => {
  let i = Math.floor(Math.random() * customersData.length);
  let customer = new Customer(customersData[i], bookingsData, roomsData);
  let hotel = new Hotel(customersData, bookingsData, roomsData);
  loadCustomerDashboard(customer);
};

//------------------Event Listeners------------------
window.addEventListener('load', fetchData());

const createEventListeners = (customersData, roomsData, bookingsData, getData, postData) => {
  bookARoomNav.addEventListener('click', displayBookingForm);




}
// myBookingsNav.addEventListener();


//------------------Event Handlers-------------------




const displayBookingForm = () => {
  hideElement(bookingsDashboard);
  showElement(userBookRoomView);
}

const loadCustomerDashboard = (customer) => {
  customerTotalSpend.innerText = `Total Spend: $${customer.totalSpend}`;
  customer.bookings.forEach((booking) => {
    let today = new Date();
    let bookingDate = new Date(booking.date);
    if (bookingDate < today) {
      pastBookings.innerHTML += bookingPreview(booking)
    };
    if (bookingDate > today){
      upcomingBookings.innerHTML += bookingPreview(booking)
    };
    if (bookingDate == today) {
      currentBookings.innerHTML += bookingPreview(booking)
    };
  });
};

const bookingPreview = (booking) => {
    return `
      <div class="booking-preview">
        <p>Date: ${booking.date}</p>
        <p>${booking.roomType} with ${booking.numBeds} bed(s)</p>
        <p>Total: $${booking.cost}</p>
      </div>`
};

const avaialableRoomPreview = (room) => {
  
}

const displayMessage = () => {

  message.innerText = 'Test Message';
};


const showElement = (element) => {
    element.classList.remove("hidden");
};

const hideElement = (element) => {
    element.classList.add("hidden");
};





const showElements = (elementsArr) => {
  elementsArr.forEach((element) => {
    element.classList.remove("hidden");
  });
};

const hideElements = (elementsArr) => {
  elementsArr.forEach((element) => {
    element.classList.add("hidden");
  });
};


export {
  displayMessage
};

//------------------ Imports -------------------
import './css/styles.css';
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
const alertBox = document.getElementById('alertBox')

const bookingsDashboard = document.getElementById('bookingsDashboard');
const userBookRoomView = document.getElementById('userBookRoomView');

const customerTotalSpend = document.getElementById('customerTotalSpend');
const currentBookings = document.getElementById('currentBookings');
const upcomingBookings = document.getElementById('upcomingBookings');
const pastBookings = document.getElementById('pastBookings');

const myBookingsNav = document.getElementById('myBookings');
const bookARoomNav = document.getElementById('bookARoom');
const logoutNav = document.getElementById('logout');

const date = document.getElementById('date');
const bookRoomForm = document.getElementById('bookRoomForm');
const bookingFiltersForm = document.getElementById('bookingFilters');
const availableRoomsSection = document.getElementById('availableRooms');

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
  currentUser = new Customer(customersData[i], bookingsData, roomsData);
  overlookHotel = new Hotel(customersData, bookingsData, roomsData);
  loadCustomerDashboard(currentUser);
};

//------------------Event Listeners------------------
window.addEventListener('load', fetchData());

const createEventListeners = (customersData, roomsData, bookingsData, getData, postData) => {
  bookARoomNav.addEventListener('click', displayBookingForm);

  bookRoomForm.addEventListener('submit', (e) => {
    findARoom(e)
  });

  bookingFiltersForm.addEventListener('click', (e) => {
    filterRoomsByType(e);
  });

  availableRoomsSection.addEventListener('click', (e) => {
    selectRoomToBook(e);
  })

}

//------------------Event Handlers-------------------

const selectRoomToBook = (e) => {
  console.log(e.target.id)
  postBooking(e.target.id, )
}

const postBooking = (id) => {
  console.log(id)
  let numId = parseInt(id)
  console.log(numId)
  let formattedDate = date.value.split('-').join('/');
  let newBooking = { "userID": currentUser.id, "date": formattedDate, "roomNumber": numId };

  postData(newBooking)
  .then((response) => {
    if(!response.ok) {
      displayMessage('There was a problem completing your request.')
    } else {
      return response.json();
    }
  })
  .then((bookings) => {
    getData(`bookings`)
    .then(data => {
      let newBookingsData = data;
      return newBookingsData;
    })
    .then(newBookingsData => {
      overlookHotel = new Hotel(customersData, newBookingsData, roomsData);
      currentUser.getBookings(newBookingsData, roomsData);
      currentUser.calculateTotalSpend();
      // viewHome();
      loadCustomerDashboard(currentUser);
      displayMessage('woohoo.')
    })
    .catch(error => {
      displayMessage('There was a problem completing your request. Please try again later.')
    });
  });
};

const viewHome = () => {
  // console.log('build out view home')
};

const filterRoomsByType = (e) => {
  if(e.target.id) {
      displayFilteredTags(e.target.value);
    };
    if(e.target.id === 'clear') {
      resetRender();
    };
};

const displayFilteredTags = (type) => {
  let availRoomPreviews = document.querySelectorAll('.avilable-room-info');
  availRoomPreviews.forEach((preview) => {
    if(preview.dataset.type !== type){
      hideElement(preview);
    } else {
      showElement(preview);
    }
  });
};

const resetRender = () => {
  let formattedDate = date.value.split("-").join("/")
  displayAvailableRooms(formattedDate)
};

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

const displayMessage = (messageText) => {
  showElement(alertBox)
  message.innerText = `${messageText}`;
  setTimeout(() => resetMessage(), 3500)
};

const resetMessage = () => {
  message.innerText = ''
  hideElement(alertBox)
}

const findARoom = (e) => {
  e.preventDefault();
  let formattedDate = date.value.split("-").join("/");
  displayAvailableRooms(formattedDate);
};

const displayAvailableRooms = (formattedDate) => {
  console.log(formattedDate)
  availableRoomsSection.innerHTML = '';
  let availableRooms = overlookHotel.getAvailableRooms(formattedDate);
  if(availableRooms.length) {
    availableRooms.forEach((room) => {
      availableRoomsSection.innerHTML += `
       <div class="avilable-room-info" id="${room.number}preview" data-type="${room.roomType}">
         <p>Room ${room.number} is a  ${room.roomType} with ${room.numBeds} ${room.bedSize} beds</p>
         <p>Cost per Night: $${room.costPerNight}</p>
         <button class="button bookIt" id="${room.number}"> Book this room </button>
       </div>`
    });
  } else if (!availableRooms.length) {

    availableRoomsSection.innerHTML += `
    <div class="no-rooms-available">
      <p>Oh no! We currently have no rooms available for ${formattedDate}. We are very sorry that we cannot meet your accomodation needs but would love you to stay another time!</p>
    </div>`
  }
};


const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
};


export {
  displayMessage
};

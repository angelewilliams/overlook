//------------------ Imports -------------------
import './css/styles.css';
import './images/overlook-logo.png';
import './images/overlook-logo-shadow.png';
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

const loginPage = document.getElementById('loginPage');
const loginForm = document.getElementById('loginForm')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')
const loginSubmitButton = document.getElementById('loginFormSubmit');
const logoutNav = document.getElementById('logout');
const loginMessage = document.getElementById('loginMessage')

const date = document.getElementById('date');
const bookRoomForm = document.getElementById('bookRoomForm');
const bookingFiltersForm = document.getElementById('bookingFilters');
const availableRoomsSection = document.getElementById('availableRooms');
const roomsWrapper = document.getElementById('roomsWrapper');
const resetDateSearch = document.getElementById('resetDateSearch');


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

  let i = (currentUser - 1);
  console.log('i', i , "currentUser" , currentUser)
  currentUser = new Customer(customersData[i], bookingsData, roomsData);
  console.log(currentUser)
  overlookHotel = new Hotel(customersData, bookingsData, roomsData);
  loadCustomerDashboard(currentUser);
};

//------------------Event Listeners------------------
// window.addEventListener('load', fetchData());
loginSubmitButton.addEventListener('click', (e) => {
  attemptLogin(e)
 });

const createEventListeners = (customersData, roomsData, bookingsData, getData, postData) => {
  bookARoomNav.addEventListener('click', displayBookingForm);

  bookRoomForm.addEventListener('submit', (e) => {
    findARoom(e)
  });

  bookingFiltersForm.addEventListener('click', (e) => {
    filterRoomsByType(e);
  });

  availableRoomsSection.addEventListener('click', (e) => {
    bookThisRoom(e);
  })

  resetDateSearch.addEventListener('click', (e) => {
    resetRender(e.target.id)
  });

  myBookingsNav.addEventListener('click', viewHome);

  logoutNav.addEventListener('click', logout);
};

//------------------Event Handlers-------------------

const attemptLogin = (e) =>{
  e.preventDefault();
  loginUser();
}

const loginUser = () => {
  loginMessage.innerText = '';
  currentUser = usernameInput.value.split('').splice(8, 3).join('');
  if (usernameInput.value.slice(0, 8) === 'customer' && usernameInput.value.slice(8) > 0 && usernameInput.value.slice(8) <= 50 && passwordInput.value === 'overlook2021') {
    fetchData();
    hideElement(loginPage);
  } else {
      loginMessage.innerText = `You have entered the wrong username or password!`;
      showElement(loginPage);
    };
};

const logout = () => {
  showElement(loginPage);
  loginForm.reset();
}

const bookThisRoom = (e) => {
  postBooking(e.target.id);
}

const postBooking = (id) => {
  let numId = parseInt(id)
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
      resetRender('resetDateSearch')
      viewHome();
      loadCustomerDashboard(currentUser);
      displayMessage('Booking successful! We look forward to your stay at The Overlook!')
    })
    .catch(error => {
      displayMessage('There was a problem completing your request. Please try again later.')
    });
  });
};

const viewHome = () => {
    bookARoomNav.classList.remove('active')
    myBookingsNav.classList.add('active')
    showElement(bookingsDashboard);
    hideElement(userBookRoomView);
};

const filterRoomsByType = (e) => {
  if(e.target.id) {
      displayFilteredTags(e.target.value);
    };
    if(e.target.id === 'clear') {
      resetRender(e.target.id);
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

const resetRender = (buttonType) => {
  let formattedDate = date.value.split("-").join("/")
  if (buttonType === 'clear'){
    displayAvailableRooms(formattedDate)
    bookingFiltersForm.reset();
  } else if (buttonType === 'resetDateSearch') {
    availableRoomsSection.innerHTML = '';
    hideElement(roomsWrapper)
    bookRoomForm.reset();
    bookingFiltersForm.reset();
  }
};

const displayBookingForm = () => {
  bookARoomNav.classList.add('active')
  myBookingsNav.classList.remove('active')
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
  showElement(roomsWrapper);
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
    hideElement(roomsWrapper);
    availableRoomsSection.innerHTML += `
    <div class="no-rooms-available">
      <p>Oh no! We currently have no rooms available for ${formattedDate}. </p>
      <p>We are very sorry that we cannot meet your accomodation needs but would love you to stay another time!</p>
    </div>`
  }
};


const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
};
//
// const toggleButton = (button, input) => {
//    if (input.value === '') {
//        button.disabled = true;
//        button.classList.add('disabled');
//    } else {
//        button.disabled = false;
//        button.classList.remove('disabled');
//    }
// };

export {
  displayMessage
};

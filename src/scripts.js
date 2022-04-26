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
    filterRoomsOnType(e);
  });

}
// myBookingsNav.addEventListener();


//------------------Event Handlers-------------------


const filterRoomsOnType = (e) => {
  console.log(e.target.dataset.type)
  if(e.target.id) {
      displayFilteredTags(e.target.value);
    };
    if(e.target.id === 'clear') {
      resetRender();
    };
};

const displayFilteredTags = (type) => {
  console.log(type)
  let allAvailRoomPreviews = document.querySelectorAll('.avilable-room-info');
  allAvailRoomPreviews.forEach((preview) => {
    if(preview.dataset.type !== type){
      hideElement(preview);
    }
    else {
      showElement(preview);
    }
  })

  let formatedDate = date.value.split("-").join("/")
  let filteredRoooms = overlookHotel.filterByType(formatedDate, type);
};

const resetRender = () => {
  let formatedDate = date.value.split("-").join("/")
  displayAvailableRooms(formatedDate)
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

const avaialableRoomPreview = (room) => {

}

const displayMessage = () => {
  showElement(message)
  message.innerText = 'Test Message';
  setTimeout(() => {
    hideElement(message), 2500
  })
};


const findARoom = (e) => {
  e.preventDefault();
  let formatedDate = date.value.split("-").join("/");
  displayAvailableRooms(formatedDate);
};

const displayAvailableRooms = (formatedDate) => {
  let availableRooms = overlookHotel.getAvailableRooms(formatedDate);
  availableRooms.forEach((room) => {
    availableRoomsSection.innerHTML += `
     <div class="avilable-room-info" id="${room.number}preview" data-type="${room.roomType}">
       <p>Room ${room.number} is a  ${room.roomType} with ${room.numBeds} ${room.bedSize} beds</p>
       <p>Cost per Night: $${room.costPerNight}</p>
       <button class="button bookIt" id="${room.number}"> Book this room </button>
     </div>`
  });
};



const bookThisRoom = (e, roomToBook) => {

  let newBooking = {
    userID: currentUser.id,
    date: formatedDate,
    roomNumber: roomToBook.number,
  };
  return newBooking;
}
/*
const postToBookings = (id) => {
  let date = dateInput.value;
  date = date.split('-');
  date = date.join('/');
  roomNumber = findIdHelper(id);
  roomNumber = Number(roomNumber);
  let obj = { "userID": currentUser.id, "date": date, "roomNumber": roomNumber };

  postBooking(obj).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((booking) => {
    errorMessage.innerText = '';
    getPromise(`http://localhost:3001/api/v1/bookings`)
    .then(jsonArray => {
      bookingsData = jsonArray.bookings;
      currentHotel = new Hotel(bookingsData, roomsData);
      populateUserBookings(bookingsData);
      updateRoomInfo(roomsData);
      findUserTotalCost(roomsData);
    })
    .catch(error => {
      errorMessage.innerText = 'we\'re sorry - there was a problem booking your room';
    });
  });
};
*/

const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
};



export {
  displayMessage
};

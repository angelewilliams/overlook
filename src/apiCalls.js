// import { displayMessage } from './dom-updates.js'

const getData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
     .then(response => response.json())
     .then(data => data[url])
     .catch(error => {
       message.innerText = `There was a problem completing your request. Error: ${error.message}`
       // displayMessage();
     });
}

const postData = (booking) => {
  return fetch(`http://localhost:3001/api/v1/booking`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking)
  })
    .then(response => {
      if(!response.ok) throw new Error('Please fill out all fields.');
      // message.innerText = `Your booking request has been accepted.`
      // return response.json();
    })
    .catch(error => {
      message.innerText = `Your Booking request has been rejected: ${error.message}`
      // displayMessage();
    });
}

const customersData = getData('customers');
const roomsData = getData('rooms');
const bookingsData = getData('bookings');

export {
  customersData,
  roomsData,
  bookingsData,
  getData,
  postData
};

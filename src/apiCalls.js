import { displayMessage } from './scripts.js'

const getRequest = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
     .then(response => response.json())
     .then(data => data[url])
     .catch(error => {
       message.innerText = `There was a problem completing your request. Error: ${error.message}`
       displayMessage();
     });
}

const postRequest = (booking) => {
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking)
  })
    .then((response) => {
      if(!response.ok) {
        throw new Error('There was a problem completing your request.');
        // message.innerText = `There was a problem completing your request.`
        displayMessage('line 23 There was a problem completing your request.');
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error('There was a problem completing your request.');
// message.innerText = `Your Booking request has been rejected: ${error.message}`
      displayMessage(`Your Booking request has been rejected: ${error.message}`);
    });
}

const customersAPI = getRequest('customers');
const roomsAPI = getRequest('rooms');
const bookingsAPI = getRequest('bookings');

export {
  customersAPI,
  roomsAPI,
  bookingsAPI,
  getRequest,
  postRequest
};

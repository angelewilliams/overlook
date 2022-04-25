import Booking from './Booking';

class Customer {
  constructor(customerData, bookingsData, roomsData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = this.getBookings(bookingsData, roomsData);
    this.totalSpend = this.calculateTotalSpend();
    }

  getBookings(bookingsData, roomsData) {
    return this.bookings = bookingsData.reduce((listOfBookings, booking) => {

      roomsData.forEach((room) => {
          if (this.id === booking.userID && room.number === booking.roomNumber) {
            listOfBookings.push(new Booking(booking, roomsData));
          };
        })

        return listOfBookings;
      }, []);

      // console.log('bookings: ', this.bookings)
  }

  calculateTotalSpend() {
    if(!this.bookings.length) {
      this.totalSpend = 0;
    } else { this.totalSpend = this.bookings.reduce((spend, booking) => {
        spend += booking.cost
        return spend
      }, 0);
    }
    return this.totalSpend
  }

  // getCurrentBookings() {
  //   return this.bookings.reduce((currentRes, booking) => {
  //     let today = new Date();
  //     let bookingDate = new Date(booking.date);
  //     if (bookingDate < today) {
  //       currentRes.push(booking);
  //     }
  //     return currentRes;
  //   }, []);
  // }
  //
  // getPastBookings() {
  //   return this.bookings.reduce((pastRes, booking) => {
  //     let today = new Date();
  //     let bookingDate = new Date(booking.date);
  //     if (bookingDate < today) {
  //       pastRes.push(booking);
  //     }
  //     return pastRes;
  //   }, []);
  // }
  //
  // getUpcomingBookings() {
  //   return this.bookings.reduce((upcomingRes, booking) => {
  //     let today = new Date();
  //     let bookingDate = new Date(booking.date);
  //     if (bookingDate > today) {
  //       upcomingRes.push(booking);
  //     }
  //     return upcomingRes;
  //   }, []);
  // }

}
export default Customer;


//need to connect booking
//all room bookings past or present
//
//GOAL FOR TODAY
//get iteraion 1 done
//remember to do the both back end and front end piecces of the bullet point

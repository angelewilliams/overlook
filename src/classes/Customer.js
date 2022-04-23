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

  // getCurrentTrips() {
  //   return this.bookings.reduce((currentRes, booking) => {
  //     let today = new Date();
  //     let bookingDate = new Date(booking.date);
  //     if (startDate < today) {
  //       currentRes.push(booking);
  //     }
  //     return currentRes;
  //   }, []);
  // }
  //
  // getPastTrips() {
  //   return this.trips.reduce((pastRes, trip) => {
  //     let today = new Date();
  //     let bookingDate = new Date(booking.date);
  //     endDate.setDate(endDate.getDate() + trip.duration);
  //     if (endDate < today) {
  //       pastRes.push(trip);
  //     }
  //     return pastRes;
  //   }, []);
  // }
  //
  // getUpcomingTrips() {
  //   return this.trips.reduce((upcomingRes, trip) => {
  //     let today = new Date();
  //     let bookingDate = new Date(booking.date);
  //     if (startDate > today) {
  //       upcomingRes.push(trip);
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

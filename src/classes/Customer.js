import Booking from './Booking';

class Customer {
  constructor(customersData, bookingsData, roomsData) {
    this.id = customersData.id;
    this.name = customersData.name;
    this.bookings = this.getBookings() || [];
    this.totalSpend;
    }

  getBookings(bookingsData, roomsData) {
    return bookingsData.reduce((acc, booking) => {
      this.roomsData.forEach((room) => {
          if (this.id === booking.userID &&
            room.number === booking.roomNumber) {
            acc.push(new Booking(booking, room));
          }
        });
        return acc;
      }, []);
  }

  calculateTotalSpend() {
    if(this.bookings.length) {
      this.totalSpend = 0;
    } else {
      this.bookings.reduce((spend, booking) => {
        spend += booking.cost
        return spend
      }, 0)
    }
  }

  getCurrentTrips() {
    return this.bookings.reduce((currentRes, booking) => {
      let today = new Date();
      let bookingDate = new Date(booking.date);
      if (startDate < today) {
        currentRes.push(booking);
      }
      return currentRes;
    }, []);
  }

  getPastTrips() {
    return this.trips.reduce((pastRes, trip) => {
      let today = new Date();
      let bookingDate = new Date(booking.date);
      endDate.setDate(endDate.getDate() + trip.duration);
      if (endDate < today) {
        pastRes.push(trip);
      }
      return pastRes;
    }, []);
  }

  getUpcomingTrips() {
    return this.trips.reduce((upcomingRes, trip) => {
      let today = new Date();
      let bookingDate = new Date(booking.date);
      if (startDate > today) {
        upcomingRes.push(trip);
      }
      return upcomingRes;
    }, []);
  }

}
export default Customer;


//need to connect booking
//all room bookings past or present
//
//GOAL FOR TODAY
//get iteraion 1 done
//remember to do the both back end and front end piecces of the bullet point

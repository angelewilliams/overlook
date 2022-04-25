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
  }

  calculateTotalSpend() {
    if(!this.bookings.length) {
      this.totalSpend = 0;
    } else { this.totalSpend = this.bookings.reduce((spend, booking) => {
        spend += booking.cost;
        spend = (Math.round(spend * 100) / 100)
        return spend;
      }, 0);
    }
    return this.totalSpend
  }

}
export default Customer;

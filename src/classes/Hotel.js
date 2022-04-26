import Booking from './Booking';
import Customer from './Customer';

class Hotel {
  constructor(customersData, bookingsData, roomsData){
    this.customers = this.getCustomers(customersData, bookingsData, roomsData)
    this.rooms = roomsData;
    this.bookings = this.getBookings(bookingsData, roomsData);
    this.revenue;
  }

  getBookings(bookingsData, roomsData) {
    let output = bookingsData.map((booking) => {
      return new Booking(booking, roomsData)
    })
    return this.bookings = output
  };

  getCustomers(customersData, bookingsData, roomsData) {
    let output = customersData.map((customer) => {
      return new Customer(customer, bookingsData, roomsData)
    })
    return this.customers = output;
  };

  getRevenue() {
    let output = this.bookings.reduce((revenueHotel, booking) => {
      if(booking.cost){
        revenueHotel += booking.cost;
      }
      return revenueHotel;
    }, 0)
    return this.revenue = output;
  };

  getAvailableRooms(date){
    let bookedRoomNums = this.bookings.filter((booking) => (booking.date === date))
      .map((bookedRoom) => bookedRoom.roomNum);

    let availableRooms = this.rooms.reduce((acc, room) => {
      if(!bookedRoomNums.includes(room.number)) {
        acc.push(room)
      };
      return acc;
    }, []);

  return availableRooms;
  };

}
//maybe a filter
// console.log(booking.date !== date)
// console.log(booking.date, date)
// console.log((booking.date !== date) , (!acc.includes(room)))
//if I find the rooms that ARE booked then I just don't include those

export default Hotel;

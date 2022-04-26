import Booking from './Booking';
import Customer from './Customer';

class Hotel {
  constructor(customersData, bookingsData, roomsData){
    this.customers = this.getCustomers(customersData, bookingsData, roomsData)
    this.rooms = roomsData;
    this.bookings = this.getBookings(bookingsData, roomsData);
    this.revenue;
    this.roomOptions = this.getRoomOptions();
  }

  getCustomers(customersData, bookingsData, roomsData) {
    let output = customersData.map((customer) => {
      return new Customer(customer, bookingsData, roomsData)
    })
    return this.customers = output;
  };

  getBookings(bookingsData, roomsData) {
    let output = bookingsData.map((booking) => {
      return new Booking(booking, roomsData)
    })
    return this.bookings = output
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

  getRoomOptions() {
    let output = this.rooms.reduce((types, room) => {
      if(!types.includes(room.roomType)){
        types.push(room.roomType)
      }
      return types
    }, []);
    return this.roomOptions = output;
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

  filterByType(date, type){
    let availableList = this.getAvailableRooms(date);

    let output = availableList.filter((room) => {
     return room.roomType.includes(type);
   });

   return output;
  };

};

export default Hotel;

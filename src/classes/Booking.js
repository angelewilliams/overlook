class Booking {
  constructor(bookingsData, roomsData) {
    this.id = bookingsData.id;
    this.userID = bookingsData.userID;
    this.date = bookingsData.date;
    this.roomNum = bookingsData.roomNumber;
    this.roomType;
    this.bidet;
    this.bedSize;
    this.numBeds;
    this.cost;
  }

  getRoomData(roomsData) {

  }
}
export default Booking;

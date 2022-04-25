class Booking {
  constructor(bookingData, roomsData) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNum = bookingData.roomNumber;
    this.roomInfo = this.getRoomData(roomsData) || 'Not available at this time';
    this.roomType;
    this.bidet;
    this.bedSize;
    this.numBeds;
    this.cost;
  }

  getRoomData(roomsData) {
   roomsData.forEach((hotelRoom) => {
      if(this.roomNum === hotelRoom.number) {
        this.roomType = hotelRoom.roomType;
        this.bidet = hotelRoom.bidet;
        this.bedSize = hotelRoom.bedSize;
        this.numBeds = hotelRoom.numBeds;
        let roomCost = (Math.round(hotelRoom.costPerNight * 100) / 100);
        this.cost = roomCost;
      }
    });
   return this.roomInfo = 'Room info has been added'
  }

}

export default Booking;

// thought about using an object here
// this.roomInfo = {
//   roomType: hotelRoom.roomType,
//   bidet: hotelRoom.bidet,
//   bedSize: hotelRoom.bedSize,
//   numBeds: hotelRoom.numBeds,
//   cost:hotelRoom.costPerNight,
// };

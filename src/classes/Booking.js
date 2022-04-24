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
        this.roomType = hotelRoom.roomType; // || 'Not available at this time';
        this.bidet = hotelRoom.bidet; // || 'Not available at this time';
        this.bedSize = hotelRoom.bedSize; // || 'Not available at this time';
        this.numBeds = hotelRoom.numBeds; // || 'Not available at this time';
        this.cost = hotelRoom.costPerNight; // || 'Not available at this time';
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

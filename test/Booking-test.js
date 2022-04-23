import chai from 'chai';
const expect = chai.expect;
const {customersData, roomsData, bookingsData} = require('./sample-dataset');
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Manager from '../src/classes/Manager';
import Booking from '../src/classes/Booking';

describe('Booking', () => {
	let booking;

	beforeEach(() => {
		booking = new Booking(bookingsData[0], roomsData);
	});

	it('should be a function', () => {
		expect(Booking).to.be.a('function');
	});

  it('should have a booking id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz');
  });

	it('should have a userID associated with it', () => {
    expect(booking.userID).to.equal();
	});

	it('should have a date', () => {
		expect(booking.date).to.equal('2022/04/22')
	});

  it('should have a room associated with it', () => {
    expect(booking.roomNum).to.equal(9)
  });

  it('should be able to get additional room data associated with booking', () => {
    booking.getRoomData(roomsData);
    expect(booking.roomType).to.equal('single room');
    expect(booking.bidet).to.equal(true);
    expect(booking.bedSize).to.equal('queen');
    expect(booking.numBeds).to.equal(2);
    expect(booking.cost).to.equal(340.17);

  });
})

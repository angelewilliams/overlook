import chai from 'chai';
const expect = chai.expect;
const {customersData, roomsData, bookingsData} = require('./sample-dataset');
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Manager from '../src/classes/Manager';
import Booking from '../src/classes/Booking';

describe('Booking', () => {
	let booking1, booking2;

	beforeEach(() => {
		booking1 = new Booking(bookingsData[0], roomsData);
		booking2 = new Booking(bookingsData[1], roomsData);
	});

	it('should be a function', () => {
		expect(Booking).to.be.a('function');
	});

  it('should have a booking id', () => {
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz');
  });

	it('should have a userID associated with it', () => {
    expect(booking1.userID).to.equal(9);
	});

	it('should have a date', () => {
		expect(booking1.date).to.equal('2022/04/22')
	});

  it('should have a room associated with it', () => {
    expect(booking1.roomNum).to.equal(5)
  });

  it('should be able to get additional room data associated with booking', () => {
    // booking.getRoomData(roomsData);
    expect(booking1.roomType).to.equal('single room');
    expect(booking1.bidet).to.equal(true);
    expect(booking1.bedSize).to.equal('queen');
    expect(booking1.numBeds).to.equal(2);
    expect(booking1.cost).to.equal(340.17);
		//Need to test sad path here
		// expect(booking2.cost).to.equal('Not available at this time');

  });
})

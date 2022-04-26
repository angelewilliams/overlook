import chai from 'chai';
const expect = chai.expect;
const {customersData, roomsData, bookingsData} = require('./sample-dataset');
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';

describe('Hotel', () => {
	let overlook, testCustomer;

	beforeEach(() => {
		overlook = new Hotel(customersData, bookingsData, roomsData);
		testCustomer = new Customer(customersData[0], bookingsData, roomsData);
	});

	it('should be a function', () => {
		expect(Hotel).to.be.a('function');
	});

	it('should have a list of all customers with accounts', () => {
		expect(overlook.customers.length).to.equal(customersData.length);
		expect(overlook.customers[0]).to.deep.equal(testCustomer);

	});

  it('should have all rooms data', () => {
    expect(overlook.rooms).to.equal(roomsData);
  });

	it('should have all booking data', () => {
    expect(overlook.bookings.length).to.equal(bookingsData.length);
	});

	it('should keep track of revenue', () => {
		overlook.getRevenue()
		expect(overlook.revenue).to.equal(2016.6)
	});

  it('should be able to get avilable rooms by date', () => {
		let testDate = '2022/04/22';
		let output = overlook.getAvailableRooms(testDate)
    expect(output.length).to.equal(4)
  });

	it('should have a list of room options', () => {
		let options = ['residential suite', 'suite', 'single room'];
		expect(overlook.roomOptions).to.deep.equal(options)
	});

});

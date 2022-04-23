import chai from 'chai';
const expect = chai.expect;
const {customersData, roomsData, bookingsData} = require('./sample-dataset');
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Manager from '../src/classes/Manager';

describe('Overlook Hotel', () => {
	let overlook;

	beforeEach(() => {
		overlook = new Hotel();
	});

	it('should be a function', () => {
		expect(Hotel).to.be.a('function');
	});

  it('should have all bookings data', () => {
    expect(overlook.rooms).to.equal(roomsData);
  });

	it('should have all booking data', () => {
    expect(overlook.bookings).to.equal(bookingsData);
	});

	it('should keep track of revenue', () => {
		overlook.getRevenue()
		expect(customer.revenue).to.equal(477.38)
	});

  it('should have a manager', () => {
    expect(overlook.manager).to.be.an.instanceOf(Manager)
  })
})

import chai from 'chai';
const expect = chai.expect;
const {customersData, bookingsData, roomsData} = require('./sample-dataset');
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';


describe.only('Customer', () => {
	let customer, sadPathCustomer;

	beforeEach(() => {
		customer = new Customer(customersData[0], bookingsData, roomsData);
		sadPathCustomer = new Customer(customersData[6], bookingsData, roomsData);
	});

	it('should be a function', () => {
		expect(Customer).to.be.a('function');
	});

	it('should have an id', () => {
    expect(customer.id).to.equal(customersData[0].id);
	});

	it('should have a name', () => {
  	expect(customer.name).to.equal(customersData[0].name)
	});

	it('should have a list of bookings', () => {
		// customer.getBookings(bookingsData, roomsData);
		// sadPathCustomer.getBookings(bookingsData, roomsData);
		// customer.getBookings(bookingsData, roomsData);
		// console.log('happy path bookings: ', customer.bookings)
		// sadPathCustomer.getBookings(bookingsData, roomsData);
		// console.log('sad path bookings: ', sadPathCustomer.bookings)
		expect(customer.bookings.length).to.equal(2)
		expect(sadPathCustomer.bookings.length).to.equal(0)
	});

	it('should calculate a total spend', () => {
		// sadPathCustomer.calculateTotalSpend();
		expect(sadPathCustomer.totalSpend).to.equal(0)

		// customer.calculateTotalSpend();
		expect(customer.totalSpend).to.equal(roomsData[1].costPerNight + roomsData[3].costPerNight)
	});

	// it('should be able to book a room', () => {
	//
	// });
});

/*
As a customer:

I should see a dashboard page that shows me:
Any room bookings I have made (past or present/upcoming)
The total amount I have spent on rooms*/

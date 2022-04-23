import chai from 'chai';
const expect = chai.expect;
const {customersData, bookingsData, roomsData} = require('./sample-dataset');
import Customer from '../src/classes/Customer';

describe('Customer', () => {
	let customer;

	beforeEach(() => {
		customer = new Customer(customersData[0]);
		//userid 1
		sadPathCustomer = new Customer(customersData[6]);
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
		customer.getBookings(bookingsData);
		sadPathCustomer.getBookings(bookingsData);
		expect(customer.bookings.length).to.equal()
		expect(sadPathCustomer.bookings.length).to.equal(0)
	});

	it('should calculate a total spend', () => {
		customer.calculateTotalSpend();
		expect(customer.totalSpend).to.equal(477.38)
	});

	it('should be able to book a room', () => {

	});
})

/*
As a customer:

I should see a dashboard page that shows me:
Any room bookings I have made (past or present/upcoming)
The total amount I have spent on rooms*/

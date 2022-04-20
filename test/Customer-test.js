import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';

describe('Customer', () => {
	let customer;

	beforeEach(() => {
		customer = new Customer();
	});

	it('should be a function', () => {
		expect(Customer).to.be.a('function');
	});

	it('should have an id', () => {
		// expect(customer.id).to.equal(ingredientsData[0].id);
	});

	it('should have a name', () => {
		// expect(customer.name).to.equal(ingredientsData[0].name);
	});

	it('should...', () => {
		// expect(customer.costInCents).to.equal(ingredientsData[0].estimatedCostInCents);
	});

})

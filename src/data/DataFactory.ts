import { Address, Customer } from './models';

let counter = 0;
const uid = () => `${Date.now().toString(36)}${(counter++).toString(36)}`;

export class DataFactory {
  static customer(overrides: Partial<Customer> = {}): Customer {
    return { email: `qa+${uid()}@example.com`, password: 'Test@12345', firstName: 'QA', lastName: 'Tester', ...overrides };
  }

  static address(overrides: Partial<Address> = {}): Address {
    return {
      firstName: 'QA', lastName: 'Tester', street: '12 MG Road', city: 'Austin', region: 'Texas',
      postcode: '78701', country: 'United States', phone: '5125550100', ...overrides
    };
  }
}

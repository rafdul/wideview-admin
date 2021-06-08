import React from 'react';
import { shallow } from 'enzyme';
import { FormOrderComponent } from './FormOrder';

describe('Component FormOrder', () => {
  it('should render without crashing', () => {
    const apartments =
      {
        name: '',
        city: '',
        priceFromNight: '',
        category: '',
        _id: '',
        dataOrder: '',
        idOrder: '',
        from: '',
        nights: '',
        people: '',
        totalPrice: '',
        status: '',
      };
    console.log('apartments', apartments);
    const order = {};

    const component = shallow(<FormOrderComponent order={order} />);
    expect(component).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { FormOrderComponent } from './FormOrder';

describe('Component FormOrder', () => {
  it('should render without crashing', () => {
    const order = [{}];
    const values = [{}];
    const fetchAllOffers = function(){};
    const fetchAllCategories = function(){};

    const component = shallow(<FormOrderComponent order={order} values={values} isNewOrder={true} fetchAllOffers={fetchAllOffers} fetchAllCategories={fetchAllCategories} />);
    console.log(component);
    expect(component).toBeTruthy();
  });
});

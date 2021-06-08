import React from 'react';
import { shallow } from 'enzyme';
import { OrdersComponent } from './Orders';

describe('Component Orders', () => {
  it('should render without crashing', () => {
    const allOrders =[];
    const fetchAllOrders = function(){};

    const component = shallow(<OrdersComponent allOrders={allOrders} fetchAllOrders={fetchAllOrders} />);
    expect(component).toBeTruthy();
  });
});

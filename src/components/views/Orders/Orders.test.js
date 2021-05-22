import React from 'react';
import { shallow } from 'enzyme';
import { OrdersComponent } from './Orders';

describe('Component Orders', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrdersComponent />);
    expect(component).toBeTruthy();
  });
});

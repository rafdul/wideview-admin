import React from 'react';
import { shallow } from 'enzyme';
import { FormOrderComponent } from './FormOrder';

describe('Component FormOrder', () => {
  it('should render without crashing', () => {
    const component = shallow(<FormOrderComponent />);
    expect(component).toBeTruthy();
  });
});

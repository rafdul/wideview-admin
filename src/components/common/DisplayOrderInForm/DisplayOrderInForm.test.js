import React from 'react';
import { shallow } from 'enzyme';
import { DisplayOrderInFormComponent } from './DisplayOrderInForm';

describe('Component DisplayOrderInForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<DisplayOrderInFormComponent />);
    expect(component).toBeTruthy();
  });
});

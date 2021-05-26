import React from 'react';
import { shallow } from 'enzyme';
import { BtnSubmitComponent } from './BtnSubmit';

describe('Component BtnSubmit', () => {
  it('should render without crashing', () => {
    const component = shallow(<BtnSubmitComponent />);
    expect(component).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { OffersComponent } from './Offers';

describe('Component Offers', () => {
  it('should render without crashing', () => {
    const component = shallow(<OffersComponent />);
    expect(component).toBeTruthy();
  });
});

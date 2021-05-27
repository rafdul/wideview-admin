import React from 'react';
import { shallow } from 'enzyme';
import { AddOfferComponent } from './AddOffer';

describe('Component AddOffer', () => {
  it('should render without crashing', () => {
    const component = shallow(<AddOfferComponent />);
    expect(component).toBeTruthy();
  });
});

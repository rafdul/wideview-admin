import React from 'react';
import { shallow } from 'enzyme';
import { OfferComponent } from './Offer';

describe('Component Offer', () => {
  it('should render without crashing', () => {
    const oneOffer = {};
    const fetchOneOffer = function(){};
    const fetchDeleteOneOffer = function(){};

    const component = shallow(<OfferComponent oneOffer={oneOffer} fetchOneOffer={fetchOneOffer} fetchDeleteOneOffer={fetchDeleteOneOffer}/>);
    expect(component).toBeTruthy();
  });
});

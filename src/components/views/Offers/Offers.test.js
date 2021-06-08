import React from 'react';
import { shallow } from 'enzyme';
import { OffersComponent } from './Offers';

describe('Component Offers', () => {
  it('should render without crashing', () => {
    const allApartments = [];
    const fetchAllOffers = function(){};

    const component = shallow(<OffersComponent allApartments={allApartments} fetchAllOffers={fetchAllOffers} />);
    expect(component).toBeTruthy();
  });
});

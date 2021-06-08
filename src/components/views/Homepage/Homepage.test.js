import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const fiveApartments = [];
    const fiveOrders = [];
    const fetchAllOffers = function(){};
    const fetchAllOrders =function(){};

    const component = shallow(<HomepageComponent fetchAllOffers={fetchAllOffers} fetchAllOrders={fetchAllOrders} fiveApartments={fiveApartments} fiveOrders={fiveOrders}/>);
    expect(component).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { OrderComponent } from './Order';

describe('Component Order', () => {
  it('should render without crashing', () => {
    const fetchOneOrder = function(){};
    const fetchDeleteOneOrder = function(){};
    // const idSubmited = 'lorem';
    const oneOrder = {};

    const component = shallow(<OrderComponent oneOrder={oneOrder} fetchOneOrder={fetchOneOrder} fetchDeleteOneOrder={fetchDeleteOneOrder}/>);
    expect(component).toBeTruthy();
  });
});

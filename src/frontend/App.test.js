// App.test.js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// Mock the modules that interact with the browser API
jest.mock('../frontend/BlockWebsiteTab.js', () => 'MockedBlockWebsiteTab');
jest.mock('../frontend/UsageSummary.js', () => 'MockedUsageSummary');
jest.mock('../frontend/ProductivityandReminders.js', () => 'MockedProductivityandReminders');

describe('App component', () => {
  it('renders correctly with initial tab', () => {
    const wrapper = shallow(<App initialActiveTab="Usage Summary" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes active tab on click', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('MockedUsageSummary').exists()).toBeTruthy(); // Initial active tab is "Usage Summary"
    expect(wrapper.find('MockedBlockWebsiteTab').exists()).toBeFalsy();
    expect(wrapper.find('MockedProductivityandReminders').exists()).toBeFalsy();

    // Click on "Block Website" tab
    wrapper.find('[title="Block Website"]').simulate('click');
    expect(wrapper.find('MockedUsageSummary').exists()).toBeFalsy();
    expect(wrapper.find('MockedBlockWebsiteTab').exists()).toBeTruthy();
    expect(wrapper.find('MockedProductivityandReminders').exists()).toBeFalsy();

    // Click on "Productivity and Reminders" tab
    wrapper.find('[title="Habit Tracker"]').simulate('click');
    expect(wrapper.find('MockedUsageSummary').exists()).toBeFalsy();
    expect(wrapper.find('MockedBlockWebsiteTab').exists()).toBeFalsy();
    expect(wrapper.find('MockedProductivityandReminders').exists()).toBeTruthy();
  });
});

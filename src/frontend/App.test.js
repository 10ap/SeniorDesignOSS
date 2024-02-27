import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the project title', () => {
  render(<App />);
  const linkElement = screen.getByText(/ECE 49595 0SS Senior Design Project/i);
  expect(linkElement).toBeInTheDocument();
});

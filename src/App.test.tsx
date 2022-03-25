import React from 'react';
import { render, screen } from '@testing-library/react';

import Test from './Test';

test('renders learn react link', () => {
  render(<Test />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  test('renders App component', () => {
    render(<Test />);
    screen.debug();
  });
});

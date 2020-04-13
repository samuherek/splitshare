import React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '../FormLabel';

describe('<FormLabel />', () => {
  it('should render snapshot', () => {
    const { getByText } = render(<FormLabel>Label</FormLabel>);
    expect(getByText(/label/i)).toMatchSnapshot();
  });
});

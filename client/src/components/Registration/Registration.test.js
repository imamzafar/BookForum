import React from 'react';
import { render } from '@testing-library/react';
import { Redirect } from "react-router-dom";
import Registration from './Registration';

describe ('Registration', () => {
    test('renders Registration component', () => {
        render ( <Registration />);

        screen.debug();

        expect(screen.getByText(/User Registration/)).toBeInTheDocument();
    });
});
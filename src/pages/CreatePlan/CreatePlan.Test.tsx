import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CreatePlan from './CreatePlan';

// Mock Axios module
jest.mock('axios');

describe('CreatePlan component', () => {
  it('submits form data and displays success message', async () => {
    const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
    mockPost.mockResolvedValueOnce({ data: {} }); // Mock the Axios post method to resolve successfully

    render(<CreatePlan />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Plan Name'), { target: { value: 'Platinum365' } });
    fireEvent.change(screen.getByLabelText('Plan Cost'), { target: { value: '499' } });
    fireEvent.change(screen.getByLabelText('Validity (Days)'), { target: { value: '365' } });
    fireEvent.change(screen.getByLabelText('Plan Status'), { target: { value: 'active' } });

    // Submit the form
    fireEvent.click(screen.getByText('Create Plan'));

    // Wait for the form submission to complete
    await waitFor(() => expect(mockPost).toHaveBeenCalled());

    // Check if success message is displayed
    expect(screen.getByText('New plan created successfully!')).toBeInTheDocument();
  });

  it('displays error message if form submission fails', async () => {
    const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
    mockPost.mockRejectedValueOnce(new Error('Failed to create new plan')); // Mock the Axios post method to reject

    render(<CreatePlan />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Plan Name'), { target: { value: 'Platinum365' } });
    fireEvent.change(screen.getByLabelText('Plan Cost'), { target: { value: '499' } });
    fireEvent.change(screen.getByLabelText('Validity (Days)'), { target: { value: '365' } });
    fireEvent.change(screen.getByLabelText('Plan Status'), { target: { value: 'active' } });

    // Submit the form
    fireEvent.click(screen.getByText('Create Plan'));

    // Wait for the form submission to complete
    await waitFor(() => expect(mockPost).toHaveBeenCalled());

    // Check if error message is displayed
    expect(screen.getByText('Failed to create new plan!')).toBeInTheDocument();
  });
});

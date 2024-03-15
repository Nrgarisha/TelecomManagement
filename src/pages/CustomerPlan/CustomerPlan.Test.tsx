import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CustomerPlan from './CustomerPlan';

// Mock Axios module
jest.mock('axios');

describe('CustomerPlan component', () => {
  it('displays plans table and allows for plan renewal', async () => {
    const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;
    mockGet.mockResolvedValueOnce({ data: [{ id: 1, planName: 'Platinum365', planCost: 499, validity: 365, planStatus: 'Active' }] });

    render(<CustomerPlan />);

    // Wait for the table to load
    await waitFor(() => expect(screen.getByText('Platinum365')).toBeInTheDocument());

    // Click on the "Renew Plan" link
    fireEvent.click(screen.getByText('Renew Plan'));

    // Verify modal is displayed with plan details
    expect(screen.getByText('Platinum365 Details')).toBeInTheDocument();

    // Click on the "Inactive" button in the modal
    fireEvent.click(screen.getByText('Inactive'));

    // Check if plan status is updated to "Inactive"
    await waitFor(() => expect(screen.getByText('Plan Status: Inactive')).toBeInTheDocument());
  });

  it('displays error message if deleting plan fails', async () => {
    const mockDelete = axios.delete as jest.MockedFunction<typeof axios.delete>;
    mockDelete.mockRejectedValueOnce(new Error('Failed to delete plan'));

    render(<CustomerPlan />);

    // Wait for the table to load
    await waitFor(() => expect(screen.getByText('Platinum365')).toBeInTheDocument());

    // Click on the "Delete" link
    fireEvent.click(screen.getByText('Delete'));

    // Check if error message is displayed
    await waitFor(() => expect(screen.getByText('Failed to delete record!')).toBeInTheDocument());
  });
});

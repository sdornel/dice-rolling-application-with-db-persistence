import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PreviousRollContainer } from './page';

// Mock data
const mockRolls = [
  { id: 1, number: 4 },
  { id: 2, number: 6 },
  { id: 3, number: 1 },
];

// Mock fetchData function
const mockFetchData = jest.fn().mockResolvedValue({ previousRolls: mockRolls });

describe('PreviousRollContainer', () => {
  test('renders previous rolls when data is fetched', async () => {
    render(<PreviousRollContainer fetchData={mockFetchData} />);

    // Check that the loading state is rendered initially
    expect(screen.getByText(/No previous rolls found/i)).toBeInTheDocument();

    // Wait for the rolls to be rendered
    await waitFor(() => {
      mockRolls.forEach((roll) => {
        expect(screen.getByText(roll.number)).toBeInTheDocument();
      });
    });
  });

  test('renders "No previous rolls found" when there are no rolls', async () => {
    mockFetchData.mockResolvedValueOnce({ previousRolls: [] });
    render(<PreviousRollContainer fetchData={mockFetchData} />);

    await waitFor(() => {
      expect(screen.getByText(/No previous rolls found/i)).toBeInTheDocument();
    });
  });
});
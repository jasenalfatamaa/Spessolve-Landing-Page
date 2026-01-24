import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import React from 'react';

// Mock Preloader
vi.mock('../components/ui/Preloader', () => ({
    default: ({ onComplete }: { onComplete: () => void }) => {
        React.useEffect(() => {
            setTimeout(() => {
                onComplete();
            }, 10);
        }, [onComplete]);
        return null;
    },
}));

describe('App Integration', () => {
    it('renders full app flow', async () => {
        const { container } = render(<App />);

        // Check for Navbar using DOM structure
        await waitFor(() => {
            // Look for the nav element which we saw in the DOM dump
            const nav = container.querySelector('nav');
            expect(nav).not.toBeNull();
        });

        // Check for "SPESSOLVE" text content inside the container to be sure
        // This avoids "Unable to find element" if it is split or weirdly structured
        await waitFor(() => {
            expect(container.textContent).toMatch(/SPESSOLVE/i); // Case insensitive check
        });

        // Check for main content
        await waitFor(() => {
            const main = container.querySelector('main');
            expect(main).not.toBeNull();
        });
    });
});

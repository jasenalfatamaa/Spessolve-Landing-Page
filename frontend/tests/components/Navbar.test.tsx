import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import React from 'react';

describe('Navbar', () => {
    const onNavigateMock = vi.fn();

    it('renders logo and Desktop links', () => {
        // Need to mock window.scrollY for Navbar scroll logic if needed, but default render is fine
        render(<Navbar onNavigate={onNavigateMock} currentView="home" />);

        expect(screen.getByText('SPESSOLVE')).toBeInTheDocument();

        // Check for some main nav links
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Work')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('calls onNavigate when Home logo is clicked', () => {
        render(<Navbar onNavigate={onNavigateMock} currentView="projects" />);

        const logo = screen.getByText('SPESSOLVE').closest('a');
        fireEvent.click(logo!);

        expect(onNavigateMock).toHaveBeenCalledWith('home');
    });

    it('toggles mobile menu', async () => {
        render(<Navbar onNavigate={onNavigateMock} currentView="home" />);

        const buttons = screen.getAllByRole('button');
        // The mobile toggle is the one with the svg icon that isn't Contact (link-like)
        // Actually the mobile toggle has `lg:hidden` class. 
        // In JSDOM, valid layout isn't strictly enforced, so it's rendered.
        // It's the button that calls setMobileMenuOpen.
        const toggleButton = buttons.find(b => b.querySelector('svg'));

        if (toggleButton) fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(screen.getByText('Start a Project')).toBeInTheDocument();
        });
    });
});

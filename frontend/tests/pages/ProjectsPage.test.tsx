import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectsPage, { allProjects } from '../../components/ProjectsPage';
import React from 'react';

describe('ProjectsPage', () => {
    const onBackMock = vi.fn();

    it('renders all projects', () => {
        render(<ProjectsPage onBack={onBackMock} />);

        expect(screen.getByText(allProjects[0].title)).toBeInTheDocument();
        expect(screen.getByText('All Projects')).toBeInTheDocument();
    });

    it('calls onBack when back button is clicked', () => {
        render(<ProjectsPage onBack={onBackMock} />);

        const backButton = screen.getByText('Back to Home').closest('button');
        fireEvent.click(backButton!);

        expect(onBackMock).toHaveBeenCalled();
    });

    it('opens project modal on click', async () => {
        render(<ProjectsPage onBack={onBackMock} />);

        const firstProject = screen.getByText(allProjects[0].title);
        fireEvent.click(firstProject);

        await waitFor(() => {
            expect(screen.getByText('The Narrative')).toBeInTheDocument();
        });
    });
});

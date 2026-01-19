import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Hero from '../../components/sections/Hero';
import About from '../../components/sections/About';
import Services from '../../components/sections/Services';
import Work from '../../components/sections/Work';
import Process from '../../components/sections/Process';
import Clients from '../../components/sections/Clients';
import CTA from '../../components/sections/CTA';
import Footer from '../../components/Footer';
import React from 'react';

// Mock child components if they cause issues (e.g. Marquee which might use complex animation loops)
// But purely rendering them should be fine with the mocked setup

describe('Sections Render', () => {
    it('Hero renders', () => {
        const { container } = render(<Hero />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('About renders', () => {
        const { container } = render(<About />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('Services renders', () => {
        const { container } = render(<Services />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('Work renders', () => {
        // Work takes a prop maybe? Checking Work.tsx... it takes onViewAll
        const { container } = render(<Work onViewAll={() => { }} />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('Process renders', () => {
        const { container } = render(<Process />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('Clients renders', () => {
        const { container } = render(<Clients />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('CTA renders', () => {
        const { container } = render(<CTA />);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('Footer renders', () => {
        const { container } = render(<Footer />);
        expect(container).not.toBeEmptyDOMElement();
    });
});

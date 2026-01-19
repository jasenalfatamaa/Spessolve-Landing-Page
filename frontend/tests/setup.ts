import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
});

// Mock HTMLElement.prototype.scrollIntoView
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    value: vi.fn(),
    writable: true,
});

// Mock IntersectionObserver
class IntersectionObserverMock {
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn();
    unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock ResizeObserver
class ResizeObserverMock {
    disconnect = vi.fn();
    observe = vi.fn();
    unobserve = vi.fn();
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

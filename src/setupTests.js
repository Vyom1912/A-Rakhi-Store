// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// React Router 7 uses TextEncoder, which the jsdom version in react-scripts doesn't provide
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextEncoder, TextDecoder });

// jsdom doesn't implement scrolling; forms call this to show the first error
Element.prototype.scrollIntoView = jest.fn();

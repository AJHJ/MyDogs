import { createContext, useState } from 'react';

// Create context with state value and updater function placeholder
export const PageContext = createContext({bodyContent: "", setBodyContent: () => {}});
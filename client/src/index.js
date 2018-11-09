import React from 'react';
import { createRoot } from 'react-dom';

import App from './App';

// Enable concurrent mode. This is an experimental API
createRoot(document.getElementById('root')).render(<App />);

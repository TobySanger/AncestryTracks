// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file sets up the root React DOM rendering, wrapes the application in Chakra UI's theme provider,
// and sets up the React Router for client-side navigation.

import { StrictMode } from 'react' // StrictMode is a tool for highlighting potential problems in an application
import { createRoot } from 'react-dom/client' // createRoot is a method for creating a root for concurrent rendering
import App from './App.jsx' // Main application component
import { ChakraProvider } from '@chakra-ui/react' // ChakraProvider is a component that provides the Chakra UI theme and context to the application
import { BrowserRouter } from 'react-router-dom' // BrowserRouter is a component that enables client-side routing in the application

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)

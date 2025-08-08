import React from 'react';
import { Box, Container,} from "@chakra-ui/react"
import Navbar from './Navbar';


const Layout = ({ children }) => {
  return (
    <Box>
        <Navbar/>
      <main className="flex-grow">
        {children}
      </main>
    </Box>
  );
};

export default Layout;
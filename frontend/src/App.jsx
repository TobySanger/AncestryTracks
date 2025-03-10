import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import TreeCollectionPage from "./pages/TreeCollectionPage";
import CreateTreePage from "./pages/CreateTreePage";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import TreeEditPage from "./pages/TreeEditPage";
import Footer from "./components/Footer";

function App() {

  return (
    <Box minH={"100vh"} display="flex" flexDirection="column" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Box flex="1">
      <Routes>
        <Route path="/treecollection" element={<TreeCollectionPage />} />
        <Route path="/create" element={<CreateTreePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/treeeditpage/:id" element={<TreeEditPage />} />
      </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App

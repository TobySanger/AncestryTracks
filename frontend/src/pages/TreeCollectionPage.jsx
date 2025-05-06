// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy
// Some elements of this code are based on the MERN stack tutorial by freeCodeCamp.org on YouTube.

// Description:
// This page displays all existing family trees in a grid format and allows users to navigate to create a new tree.
// It uses Zustand for state management, Chakra UI for styling, and React Router for navigation.

import { Button, Container, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'; 
import { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Nav between pages
import { useFamilytreeStore } from '../store/familytree'; // Zustand store for family tree data
import FamilytreeCard from '../components/FamilytreeCard'; // Component to display individual family tree cards
import { PlusSquareIcon } from '@chakra-ui/icons'; 


const TreeCollectionPage = () => {

  // Fetch family trees from the Zustand store
  const { fetchFamilytrees, familytrees } = useFamilytreeStore();

  // Fetch the list of family trees when the component mounts
  useEffect(() => {
    fetchFamilytrees();
  }, [fetchFamilytrees]);
  // Log the family trees to the console for debugging
  console.log("familytrees", familytrees);

  // Render the TreeCollectionPage
  // It includes a header, a button to create a new tree, and a grid of family tree cards
  // If no trees are found, a message is displayed prompting the user to create a new tree
  // The page is styled using Chakra UI components
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <HStack alignItems={"center"}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient='linear(to-r, #7928CA, #FF0080)' // Gradient for the text by Chakra UI: https://v2.chakra-ui.com/docs/styled-system/gradient 
            bgClip={"text"}
            textAlign={"center"}
          >
            Current Trees
          </Text> 
          <Link to={"/create"}>
            <Button>
                <PlusSquareIcon fontSize={20}/>
            </Button>
          </Link>

        </HStack>

        <SimpleGrid
          columns= {{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {/* Map through the familytrees array and render a FamilytreeCard for each tree */}
          {/* The FamilytreeCard component is responsible for displaying the details of each family tree */}
          {familytrees.map((familytree) => (
            <FamilytreeCard key={familytree._id} familytree={familytree} />
          ))}
        </SimpleGrid>

        {/* If no family trees are found, display a message prompting the user to create a new tree */}
        {familytrees.length === 0 && (
          <Text fontSize="xl" textAlign={"center"} fontWeight='bold' color='gray.500'>
          No Trees found 🌳 {" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline"}}>
              Create a tree 
            </Text>
          </Link>
        </Text>
        )}

      </VStack>
    </Container>
  )
}

export default TreeCollectionPage
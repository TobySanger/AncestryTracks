// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the TreeEditPage component, which is responsible for rendering the family tree editing interface.
// It fetches the family tree data from the store and displays it using the FamilyTreeVisuals component.
// The component uses React Router to extract the tree ID from the URL parameters and fetches the corresponding family tree data.
// It also handles loading states and displays a loading message if the family tree data is not yet available.

import React, { useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; // Importing useParams from react-router-dom to access URL parameters
import { useFamilytreeStore } from '../store/familytree'; // Importing the custom store for managing family tree data
import FamilyTreeVisuals from '../components/FamilyTreeVisuals'; // Importing the FamilyTreeVisuals component to display the family tree
import { Heading } from '@chakra-ui/react'; // Importing Chakra UI's Heading component for styling

const TreeEditPage = () => { 
  const { id: treeId } = useParams(); // Extracting the tree ID from the URL parameters using useParams
  const familytrees = useFamilytreeStore((state) => state.familytrees); // Accessing the familytrees state from the store
  const fetchFamilytree = useFamilytreeStore((state) => state.fetchFamilytree); // Fetching the family tree data from the store

  // Fetch the family tree data when the component mounts or when familytrees is empty
  useEffect(() => { 
    if (familytrees.length === 0) {
      fetchFamilytree();
    }
  }, [familytrees, fetchFamilytree]); 

  // Find the family tree that matches the treeId from the URL
  const familyTree = familytrees.find((tree) => tree._id === treeId);


  if (!familyTree) {
    return <div>Loading...</div>;
  }

  // Render the family tree editing page
  // Display the family tree name and the FamilyTreeVisuals component
  return (
    <div>
      <Heading as={"h1"} size={"lg"} textAlign={"center"} mb={8} mt={7}  >
        {familyTree.name} Family Tree
      </Heading>
      <FamilyTreeVisuals treeId={treeId} />
    </div>
  );
};

export default TreeEditPage
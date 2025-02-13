import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFamilytreeStore } from '../store/familytree';
import FamilyTreeVisuals from '../components/FamilyTreeVisuals';
import { Heading } from '@chakra-ui/react';

const TreeEditPage = () => {
  const { id: treeId } = useParams();
  const familytrees = useFamilytreeStore((state) => state.familytrees);
  const fetchFamilytree = useFamilytreeStore((state) => state.fetchFamilytree);

  useEffect(() => {
    if (familytrees.length === 0) {
      fetchFamilytree();
    }
  }, [familytrees, fetchFamilytree]);

  const familyTree = familytrees.find((tree) => tree._id === treeId);

  if (!familyTree) {
    return <div>Loading...</div>;
  }

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
import { Button, Container, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFamilytreeStore } from '../store/familytree';
import FamilytreeCard from '../components/FamilytreeCard';
import { PlusSquareIcon } from '@chakra-ui/icons';


const TreeCollectionPage = () => {

  const { fetchFamilytrees, familytrees } = useFamilytreeStore();

  useEffect(() => {
    fetchFamilytrees();
  }, [fetchFamilytrees]);
  console.log("familytrees", familytrees);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <HStack alignItems={"center"}>
          <Text
            fontSize={"36"}
            fontWeight={"bold"}
            bgGradient='linear(to-r, #7928CA, #FF0080)'
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
          {familytrees.map((familytree) => (
            <FamilytreeCard key={familytree._id} familytree={familytree} />
          ))}
        </SimpleGrid>

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
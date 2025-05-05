import { Box, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";


const CustomTreeNode = ({ nodeDatum, toggleNode, onEdit, onDelete }) => {
    const bg = useColorModeValue("gray.100", "gray.800");   
    const textColor = useColorModeValue("gray.700", "gray.200");
    const imageBg = useColorModeValue("gray.300", "gray.700"); 
    const buttonBg = useColorModeValue("blue.200", "blue.700"); 
  
    return (
    <foreignObject width="160" height="180" x={-80} y={-90}>
      <Box
        w="160px"
        h="180px"
        bg="bg"
        color="textColor"
        borderRadius="md"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        boxShadow="lg"
        onClick={() => 
            toggleNode(nodeDatum)} 
        cursor="pointer"
      >
        {/* Top: Image area */}
        <Box
          bg={imageBg}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <FaUser size="50" color="#d13f7b" />
        </Box>

        {/* Bottom: Name + buttons */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={2}
          flex="1"
          bg={buttonBg}
        >
          <Text fontSize="md" fontWeight="semibold" textAlign="center">
            {nodeDatum.name}
          </Text>
          

          <Box display="flex" gap={2}>
            <IconButton
              icon={<EditIcon />}
              size="sm"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation(); 
                onEdit(nodeDatum);
              }}
              aria-label="Edit"
            />
            
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation(); 
                onDelete(nodeDatum);
              }}
              aria-label="Delete"
            />
          </Box>

          
        </Box>
      </Box>
    </foreignObject>
  );
};

export default CustomTreeNode;

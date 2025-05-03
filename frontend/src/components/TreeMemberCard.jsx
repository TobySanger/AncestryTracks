import { Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
    Textarea, VStack, HStack, useColorModeValue, Image } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
    
    const TreeMemberCard = ({ isOpen, onClose, member, onSave }) => {
      const [formData, setFormData] = useState({
        fullName: "",
        birthDate: "",
        deathDate: "",
        description: "",
        photo: ""
      });
    
      const bg = useColorModeValue("white", "gray.800");
      const inputBg = useColorModeValue("gray.200", "gray.700");
    
      useEffect(() => {
        if (member) {
          setFormData({
            fullName: member.name || "",
            birthDate: member.birthDate ? member.birthDate.slice(0, 10) : "", // The slice turns the ISO string into a YYYY-MM-DD format 
            deathDate: member.deathDate ? member.deathDate.slice(0, 10) : "",
            description: member.description || "",
            photo: member.photo || ""
          });
        }
      }, [member]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = () => {
        onSave({ ...member, ...formData });
        onClose();
      };
    
      return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
          <ModalOverlay />
          <ModalContent bg={bg} p={4} borderRadius="lg">
            <ModalHeader>Edit Family Member</ModalHeader>
            <ModalCloseButton />
    
            <ModalBody>
              <HStack align="flex-start" spacing={8}>
                {/* Left Section */}
                <VStack flex="0.7" spacing={4} align="stretch">
                  <Box
                    bg={inputBg}
                    h="200px"
                    w="200px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                  >
                    {formData.photo ? (
                      <Image src={formData.photo} boxSize="100%" borderRadius="md" />
                    ) : (
                      <Box color="gray.400">No Photo</Box>
                    )}
                  </Box>
    
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </FormControl>
    
                  <HStack>
                    <FormControl>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input
                        type="Date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </FormControl>
    
                    <FormControl>
                      <FormLabel>Date of Death</FormLabel>
                      <Input
                        type="Date"
                        name="deathDate"
                        value={formData.deathDate}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </HStack>
    
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Every detail helps — where they lived, life events, occupation, etc."
                      rows={4}
                    />
                  </FormControl>
                </VStack>
    
                {/* Right Placeholder (AI insights) */}
                <Box flex="1.3" bg={inputBg} borderRadius="md" p={4} minH="480px">
                  <strong>Coming soon... </strong>
                  <br />
                  Historical insights space comming soon. Release date August 2025
                  <br />
                </Box>
  
              </HStack>
            </ModalBody>
    
            <ModalFooter>
              <Button colorScheme="pink" mr={3} onClick={handleSubmit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    };
    
    export default TreeMemberCard;
    
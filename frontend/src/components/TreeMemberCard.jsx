// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the TreeMemberCard component, which is a modal used for editing family member details.
// It includes fields for the member's name, birth date, death date, description, and photo But also a coming soon section for AI insights.
// The component uses Chakra UI for styling and layout, and it manages its state using React hooks.
// It also handles the submission of the form data to the parent component via the onSave prop.

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
    
      // Using Chakra UI's useColorModeValue to set colors based on the current color mode
      const bg = useColorModeValue("white", "gray.800");
      const inputBg = useColorModeValue("gray.200", "gray.700");
    
      // Effect to populate the form with existing member data when the modal opens
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
    
      // Handle changes in the input fields
      // It updates the formData state with the new values
      const handleChange = (e) => {
        const { name, value } = e.target; // 
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      // Handle form submission
      // It calls the onSave function passed as a prop with the updated member data
      // and then closes the modal
      const handleSubmit = () => {
        onSave({ ...member, ...formData });
        onClose();
      };
    
      // Render the modal with input fields for name, birth date, death date, description, and photo
      // It also includes a placeholder for AI insights
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
    
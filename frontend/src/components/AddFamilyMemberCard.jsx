// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This component is a modal dialog for adding a family member to a family tree.
// It includes input fields for the family member's name and their relation to the selected member.
// The modal can be opened or closed, and it handles the submission of the new family member's details.
// If a family member isnt selected, it will only show the name input field.(First memmber on the tree)
// If a family member is selected, it will show the name input field and the relation type (parent, child, spouse).

import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types' // Import PropTypes for prop validation

const AddFamilyMemberCard = ({ 
    isOpen, onClose, onSubmit, selectedMember, relationType, setRelationType 
}) => {
    const [name, setName] = useState(""); // State for the family member's name

    // Returns a dynamic title depending on whether a member is selected
    const getTitle = () => {
        if (!selectedMember) return "Add Family Member";
        return `Add a Family Member to ${selectedMember.name}`;
    };

    // Submits the new member's details
    // Calls the onSubmit function passed as a prop with the name and relationType
    const handleSubmit = () => {
        onSubmit(name, relationType);
        setName(""); 
        setRelationType("");
        onClose();
      };

    // Render the modal with input fields for name and relation type
    return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>{getTitle()}</ModalHeader>
            <ModalCloseButton onClick={onClose} />

                <ModalBody>
                    <FormControl>
                        <FormLabel>Family member name</FormLabel>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name..."
                        />
                    </FormControl>

                    {/* Only showing relation options when adding a relations to selected member */}
                    {selectedMember && (
                        <FormControl mt={4}>
                            <FormLabel>Select relation</FormLabel>
                            <RadioGroup onChange={setRelationType} value={relationType}>
                            <Stack direction="column">
                                <Radio value="parent">Parent</Radio>
                                <Radio value="child">Child</Radio>
                                {/* <Radio value="spouse">Spouse</Radio> */}
                            </Stack>
                            </RadioGroup>
                        </FormControl>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme="blue" 
                         // Disable if name is empty or relationType is not selected. 
                         // Users can only add a family member if they have selected a family member relations and name.
                        disabled={!name || (selectedMember && !relationType)}
                        onClick={handleSubmit} // Submit the new member's details
                    >
                        Add
                    </Button>
                </ModalFooter>
        </ModalContent>
    </Modal>
  );
};

// This block defines the expected props that the AddFamilyMemberCard 
// component should receive and enforces their types using the prop-types library.
AddFamilyMemberCard.propTypes = { 
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, 
    selectedMember: PropTypes.object, 
    relationType: PropTypes.string,
    setRelationType: PropTypes.func.isRequired,
  };

export default AddFamilyMemberCard;
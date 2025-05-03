import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddFamilyMemberCard = ({ 
    isOpen, onClose, onSubmit, selectedMember, relationType, setRelationType 
}) => {
    const [name, setName] = useState("");

    const getTitle = () => {
        if (!selectedMember) return "Add Family Member";
        return `Add a Family Member to ${selectedMember.name}`;
    };

    const handleSubmit = () => {
        onSubmit(name, relationType);
        setName(""); 
        setRelationType("");
        onClose();
      };

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

                    {/* Only showing relation options when adding a parent */}
                    {selectedMember && (
                        <FormControl mt={4}>
                            <FormLabel>Select relation</FormLabel>
                            <RadioGroup onChange={setRelationType} value={relationType}>
                            <Stack direction="column">
                                <Radio value="parent">Parent</Radio>
                                <Radio value="child">Child</Radio>
                                <Radio value="spouse">Spouse</Radio>
                            </Stack>
                            </RadioGroup>
                        </FormControl>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme="blue" 
                        disabled={!name || (selectedMember && !relationType)}
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                </ModalFooter>
        </ModalContent>
    </Modal>
  );
};

AddFamilyMemberCard.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedMember: PropTypes.object,
    relationType: PropTypes.string,
    setRelationType: PropTypes.func.isRequired,
  };

export default AddFamilyMemberCard;
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddFamilyMemberCard = ({ 
    isOpen, onClose, onSubmit, selectedMember, relationType, setRelationType 
}) => {
    const [name, setName] = useState("");

    const getTitle = () => {
        if (!selectedMember) return "Add Family Member";
    
        // Only allow specific options based on relationType
        switch (relationType) {
            case "parent":
                return `Add Parent to ${selectedMember.name} || "New Parent"`;
            case "child":
                return `Add Child to ${selectedMember.name} || "New Child"`;
            default:
                return "Add Family Member";
        }
    };

    // console.log("🟢 Modal Open - selectedMember:", selectedMember, "relationType:", relationType);


    return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>{getTitle()}</ModalHeader>
            <ModalCloseButton onClick={onClose} />

                <ModalBody>
                    <FormControl>
                        <FormLabel>Family Member Name test</FormLabel>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name..."
                        />
                    </FormControl>

                    {/* Only show relation options when adding a parent */}
                    {selectedMember && relationType === "parent" && (
                        <FormControl mt={4}>
                            <FormLabel>Select Parent Type</FormLabel>
                            <RadioGroup onChange={setRelationType} value={relationType}>
                            <Stack direction="column">
                                <Radio value="father">Father</Radio>
                                <Radio value="mother">Mother</Radio>
                            </Stack>
                            </RadioGroup>
                        </FormControl>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme="blue" 
                        disabled={!name || (selectedMember && !relationType)}
                        // onClick={() => onSubmit(name)}

                        onClick={() => {
                            onSubmit(name),
                            onClose()
                        }}
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
    relationType: PropTypes.string.isRequired,
    setRelationType: PropTypes.func.isRequired,
  };

export default AddFamilyMemberCard;
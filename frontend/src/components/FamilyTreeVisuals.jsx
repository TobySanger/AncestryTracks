// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file renders the main visual family tree using react-d3-tree.
// It manages the display, editing, and adding of family members, handles relationships, 
// and connects to the modals and custom nodes for user interaction.
// It also handles the loading of family members and the transformation of data into a format suitable for the tree visualization.

import { Box, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree'; // Visual tree rendering library
import AddFamilyMemberCard from './AddFamilyMemberCard'; // Modal to add new family members
import { useFamilyMemberStore } from '../store/familymember';
import CustomTreeNode from './CustomTreeNode'; // Custom node component for rendering family members
import { useToast } from '@chakra-ui/react'; 
import TreeMemberCard from './TreeMemberCard'; // Modal for editing existing family member details

const FamilyTreeVisuals = ({ treeId }) => {
  const { familyMembers, fetchFamilyMembers, addFamilyMember, addMemberRelations } = useFamilyMemberStore();

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal control

  const [tree, setTree] = useState(null); // State for the tree data
  const close = () => setIsOpen(false); // Function to close the modal

  const [selectedMember, setSelectedMember] = useState(null); // State for the selected family member
  const [relationType, setRelationType] = useState(""); // State for the relation type (parent, child, spouse)

  const toast = useToast();

  const { deleteFamilyMember } = useFamilyMemberStore(); 

  const [editingMember, setEditingMember] = useState(null); // State for the member being edited
  const { updateFamilyMember } = useFamilyMemberStore(); 

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Function to handle the edit action
  // It sets the selected member to be edited and opens the edit modal
  const handleEdit = (node) => {
    setEditingMember(node);
    setIsEditOpen(true);
  };

  // Function to handle saving the edited member details
  // It updates the member in the database and refreshes the tree
  // It also handles error and success notifications using Chakra UI's toast
  const handleSaveEdit = async (updatedData) => {
    console.log("🛠️ Updating member with data:", updatedData); 
    const { _id, ...fieldsToUpdate } = updatedData;
  
    const { success, message } = await updateFamilyMember(_id, fieldsToUpdate);
  
    if (!success) {
      toast({
        title: "Update Failed",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    toast({
      title: "Family Member Updated",
      description: "Changes saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  
    setIsEditOpen(false);
    await fetchFamilyMembers(treeId); // Refresh tree
  };

  // Function to handle deleting a family member
  // It confirms the deletion, deletes the member from the database, and refreshes the tree
  // It also handles error and success notifications using Chakra UI's toast
  // It uses window .confirm to ask for user confirmation before deleting
  const handleDeleteMember = async (memberId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this family member?");
    if (!confirmDelete) return;

    const { success, message } = await deleteFamilyMember(memberId);

    if (!success) {
      toast({
        title: "Error deleting member",
        description: message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Member Deleted",
        description: message || "The family member has been removed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      await fetchFamilyMembers(treeId); 
    }
  };


  // Ensures the tree visual loads correct data as soon as the component mounts
  // It fetches family members from the backend using the treeId prop
  // It uses the useEffect hook to call fetchFamilyMembers when the component mounts
  useEffect(() => {
    const loadFamilyMembers = async () => {
      if (treeId) {
        await fetchFamilyMembers(treeId);
      };
    };
    loadFamilyMembers();
  }, [fetchFamilyMembers, treeId]);

  // Re-render the visual tree whenever the familyMembers array changes
  useEffect(() => {
    if (familyMembers.length === 0) {
        // If there are no members, assume it's the first time setup
        setSelectedMember(null); // Clear selection
        setRelationType(""); // Clear relation type
        onOpen(); // Open modal automatically for first member
    } else { 
        // Transform the family members data into a format suitable for react-d3-tree
        const formattedTree = transformToD3Tree(familyMembers);
        setTree(formattedTree);
    }
}, [familyMembers]);


  // Function to handle node clicks in the tree
  // It sets the selected member and opens the modal to add a family member
  const handleNodeClick = (nodeData) => {
    console.log("Clicked node data:", nodeData);
    setSelectedMember(nodeData.data); // Store clicked member data
    setRelationType(""); 
    onOpen(); // Open modal to add a family member
  };

  // Function to handle adding a new family member
  const handleAddMember = async (name, relation) => {
    console.log(" handleAddMember called with:", {
      name,
      relation,
      selectedMember,
    });
  
    // Ensure name is provided, and if adding a related member, relation must also be selected
    if (!name || (selectedMember && !relation)) {
      console.warn(" Name or relation missing. Cannot add member.");
      return;
    }
    // Create a new family member object
    const newMember = {
      treeId,
      fullName: name,
      birthDate: new Date().toISOString(),
    };
  
    const response = await addFamilyMember(newMember); // Add new member to the database
    console.log(" addFamilyMember result:", response);
  
    if (response.success && response.data) { // Check if the member was added successfully
      const newMemberId = response.data._id; // Get the ID of the newly added member
  
      // If a member is selected and a relation type is provided, add the relation
      if (selectedMember && relation) {
        console.log(" adding relation", {
          memberId: selectedMember._id,
          relationType: relation,
          relatedMemberId: newMemberId,
        });
  
        const relationResult = await addMemberRelations({ // Add relation between members
          memberId: selectedMember._id,
          relationType: relation,
          relatedMemberId: newMemberId,
        });
  
        console.log(" addMemberRelations result:", relationResult);
      }
  
      await fetchFamilyMembers(treeId); // Refresh the family members list
      onClose();
    } else {
      console.error(" Failed to add family member:", response.message);
    }
  };
  
  

  // Return is for rendering the component
  // It includes the tree visualization, modals for adding and editing family members
  // and handles the layout using Chakra UI's Box component
  return (
    <Box h="100vh" w="100%" >
      {tree ? 
      <Tree 
        data={tree} 
        orientation="vertical"
        onNodeClick={handleNodeClick}
        translate={{
          x: 600,
          y: 300
        }}
        nodeSize={{
          x: 200,
          y: 250
        }}
        pathFunc="step"
      
        renderCustomNodeElement={(rd3tProps) => ( // Custom node rendering
          <CustomTreeNode
            nodeDatum={rd3tProps.nodeDatum} // Node data
            toggleNode={(node) => { // Toggle node function
              setSelectedMember(node); // Set selected member
              setRelationType(""); // Clear relation type
              onOpen();
            }}
            onEdit={handleEdit}
            onDelete={(node) => {
              handleDeleteMember(node._id); 
            }}
          />
        )}

        /> : <p>Loading tree...</p>}
      <AddFamilyMemberCard  // Modal for adding family members
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={handleAddMember}
        selectedMember={selectedMember}
        relationType={relationType}
        setRelationType={setRelationType}/>
        
      <TreeMemberCard // Modal for editing family member details
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        member={editingMember}
        onSave={handleSaveEdit}
      />

    </Box>
  );
};



// Helper function to format flat member array into a hierarchical structure compatible with react-d3-tree
const transformToD3Tree = (members) => {
  const memberMap = {};

  // First, build a map of all members by ID
  members.forEach(member => {
    memberMap[member._id] = {
      name: member.fullName,
      _id: member._id,
      birthDate: member.birthDate,
      deathDate: member.deathDate,
      description: member.description,
      photo: member.photo,
      relations: member.relations,
      children: []
    };
  });

  // Next, link members to their parents by pushing into the "children" array
  members.forEach(member => {
    const current = memberMap[member._id];

    // Attach parents as children (flipping direction for visual tree)
    (member.relations.parents || []).forEach(parent => {
      const parentId = parent._id || parent; // Handle both ObjectId and string
      if (memberMap[parentId]) { // Check if parent exists in the map
        current.children.push(memberMap[parentId]); // Add to parent's children
      }
    });
  });

  // Pick a child with no children as root (usually latest generation)
  const root = members.find(
    member => !member.relations.children || member.relations.children.length === 0
  );

  return root ? memberMap[root._id] : Object.values(memberMap)[0];
};




export default FamilyTreeVisuals;

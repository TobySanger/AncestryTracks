import { Box, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import AddFamilyMemberCard from './AddFamilyMemberCard';
import { useFamilyMemberStore } from '../store/familymember';
import CustomTreeNode from './CustomTreeNode';
import { useToast } from '@chakra-ui/react'; 
import TreeMemberCard from './TreeMemberCard';

const FamilyTreeVisuals = ({ treeId }) => {
  const { familyMembers, fetchFamilyMembers, addFamilyMember, addMemberRelations } = useFamilyMemberStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tree, setTree] = useState(null);
  const close = () => setIsOpen(false);

  const [selectedMember, setSelectedMember] = useState(null);
  const [relationType, setRelationType] = useState("");

  const toast = useToast();
  const { deleteFamilyMember } = useFamilyMemberStore(); 

  const [editingMember, setEditingMember] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { updateFamilyMember } = useFamilyMemberStore(); 

  const handleEdit = (node) => {
    setEditingMember(node);
    setIsEditOpen(true);
  };

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


  useEffect(() => {
    const loadFamilyMembers = async () => {
      if (treeId) {
        await fetchFamilyMembers(treeId);
      };
    };
    loadFamilyMembers();
  }, [fetchFamilyMembers, treeId]);

  useEffect(() => {
    if (familyMembers.length === 0) {
        setSelectedMember(null); // No parent yet
        setRelationType(""); // Clear relation selection
        onOpen(); // Open modal automatically for first member
    } else { 
        const formattedTree = transformToD3Tree(familyMembers);
        setTree(formattedTree);
    }
}, [familyMembers]);



  const handleNodeClick = (nodeData) => {
    console.log("Clicked node data:", nodeData);
    setSelectedMember(nodeData.data); // Store clicked member data
    setRelationType(""); 
    onOpen(); // Open modal to add a family member
  };

  const handleAddMember = async (name, relation) => {
    console.log(" handleAddMember called with:", {
      name,
      relation,
      selectedMember,
    });
  
    if (!name || (selectedMember && !relation)) {
      console.warn(" Name or relation missing. Cannot add member.");
      return;
    }
  
    const newMember = {
      treeId,
      fullName: name,
      birthDate: new Date().toISOString(),
    };
  
    const response = await addFamilyMember(newMember);
    console.log(" addFamilyMember result:", response);
  
    if (response.success && response.data) {
      const newMemberId = response.data._id;
  
      if (selectedMember && relation) {
        console.log(" adding relation", {
          memberId: selectedMember._id,
          relationType: relation,
          relatedMemberId: newMemberId,
        });
  
        const relationResult = await addMemberRelations({
          memberId: selectedMember._id,
          relationType: relation,
          relatedMemberId: newMemberId,
        });
  
        console.log(" addMemberRelations result:", relationResult);
      }
  
      await fetchFamilyMembers(treeId);
      onClose();
    } else {
      console.error(" Failed to add family member:", response.message);
    }
  };
  
  


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
      
        renderCustomNodeElement={(rd3tProps) => (
          <CustomTreeNode
            nodeDatum={rd3tProps.nodeDatum}
            toggleNode={(node) => {
              setSelectedMember(node);
              setRelationType("");
              onOpen();
            }}
            onEdit={handleEdit}
            onDelete={(node) => {
              handleDeleteMember(node._id); 
            }}
          />
        )}

        /> : <p>Loading tree...</p>}
      <AddFamilyMemberCard 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={handleAddMember}
        selectedMember={selectedMember}
        relationType={relationType}
        setRelationType={setRelationType}/>
        
      <TreeMemberCard
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        member={editingMember}
        onSave={handleSaveEdit}
      />

    </Box>
  );
};



// Convert DB data to react-d3-tree format
const transformToD3Tree = (members) => {
  const memberMap = {};

  // Build base nodes
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

  // Link parents as "children" in visual tree
  members.forEach(member => {
    const current = memberMap[member._id];

    // Attach parents as children (flipping direction for visual tree)
    (member.relations.parents || []).forEach(parent => {
      const parentId = parent._id || parent;
      if (memberMap[parentId]) {
        current.children.push(memberMap[parentId]);
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

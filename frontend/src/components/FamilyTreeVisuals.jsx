import { Box, useDisclosure, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import AddFamilyMemberCard from './AddFamilyMemberCard';
import { useFamilyMemberStore } from '../store/familymember';

const FamilyTreeVisuals = ({ treeId }) => {
    const { familyMembers, fetchFamilyMembers, addFamilyMember } = useFamilyMemberStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tree, setTree] = useState(null); // hook
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [selectedMember, setSelectedMember] = useState(null);
    const [relationType, setRelationType] = useState("");

    useEffect(() => {
        const loadFamilyMembers = async () => {
            if (treeId) {
                setIsLoading(true); // Indicate data is loading
                await fetchFamilyMembers(treeId);
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        setTree(null); // Clear tree data when switching trees
        loadFamilyMembers();
    }, [treeId]);

    useEffect(() => {
        if (!isLoading) {
            if (familyMembers.length === 0) {
                onOpen(); // Open modal only if still empty after fetching
            } else {
                const formattedTree = transformToD3Tree(familyMembers);
                setTree(formattedTree);
            }
        }
    }, [familyMembers, isLoading]);

    const handleAddMember = async (name) => {
        const newMember = {
            treeId,
            fullName: name,
            birthDate: new Date().toISOString(),
            relations: {}
        };
        const response = await addFamilyMember(newMember);
        if (response.success) {
            onClose();
        }
    };

    // Added 
    const handleAddRelation = (nodeDatum, relation) => {
        setSelectedMember(nodeDatum);
        setRelationType(relation);
        onOpen();
    };

    const renderSquareNode = ({ nodeDatum }) => {
        const isPlaceholder = nodeDatum._id === "empty-root";

        return (
            <g>
                {/* Main Square Node */}
                <rect 
                    width="120" height="70" x="-60" y="-35" 
                    fill={isPlaceholder ? "#A50053" : "#3498db"}
                    stroke={isPlaceholder ? "#D81B60" : "#2980b9"} 
                    strokeWidth="2" rx="8" ry="8"
                    style={{ cursor: isPlaceholder ? "pointer" : "default" }}
                />
                <text x="0" y="-10" textAnchor="middle" dominantBaseline="middle" fill='white' fontSize="12">
                    {nodeDatum.name}
                </text>

                <foreignObject x="-50" y="10" width="100" height="30">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton icon={<EditIcon />} colorScheme="blue" size="xs" mx="1" />
                        <IconButton icon={<DeleteIcon />} colorScheme="red" size="xs" mx="1" />
                    </Box>
                </foreignObject>

                {/* Clickable Areas for Adding Relations */}
                {/* Top box for adding parents */}
                <rect x="-20" y="-55" width="40" height="20" fill="transparent"
                      stroke="black" strokeWidth="1" 
                      onClick={() => handleAddRelation(nodeDatum, "parent")}
                />
            
                {/* 🔵 Bottom Box for Adding a Child */}
                <rect x="-20" y="40" width="40" height="20" fill="transparent"
                      stroke="black" strokeWidth="1" 
                      onClick={() => handleAddRelation(nodeDatum, "child")}
                />
            </g>
        );
    };

    return (
        <Box h="100vh" w="100%">
            {tree ? (
                <Tree 
                    data={tree} 
                    translate={{ x: 300, y: 200 }}
                    renderCustomNodeElement={renderSquareNode}
                />
            ) : isLoading ? ( 
                <p>Loading tree...</p>
            ) : (
                <p>No members found. Add a new family member.</p>
            )}
            <AddFamilyMemberCard 
                isOpen={isOpen} 
                onClose={onClose} 
                onSubmit={handleAddMember}
            />
        </Box>
    );
};

/** Define transformToD3Tree to FIX the error */
const transformToD3Tree = (members) => {
    const memberMap = {};
    members.forEach(member => {
        memberMap[member._id] = { name: member.fullName, children: [] };
    });

    members.forEach(member => {
        if (member.relations.father && memberMap[member.relations.father]) {
            memberMap[member.relations.father].children.push(memberMap[member._id]);
        }
        if (member.relations.mother && memberMap[member.relations.mother]) {
            memberMap[member.relations.mother].children.push(memberMap[member._id]);
        }
    });

    return Object.values(memberMap)[0] || null; // Return root member or null if no members exist
};

export default FamilyTreeVisuals;

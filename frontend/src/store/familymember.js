import { create } from "zustand";

export const useFamilyMemberStore = create((set) => ({
    familyMembers: [],

    setFamilyMembers: (familyMembers) => set({ familyMembers }),

    fetchFamilyMembers: async (treeId) => {
        try {
            const res = await fetch(`/api/treemembers/getMembers/${treeId}`);
            const data = await res.json();
            set({ familyMembers: data.data || [] }); // Default to empty array if no data
        } catch (error) {
            console.error("Error fetching members", error);
            set({ familyMembers: [] }); // prevent undefined values. 
        }
        
    },

    addFamilyMember: async (newMember) => {
        const res = await fetch("/api/treemembers/createMember", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMember),
        });
        const data = await res.json();

        if (data.success) {
            set((state) => ({ familyMembers: [...state.familyMembers, data.data] }));
            return { 
                success: true, 
                message: "Family member added successfully",
                data: data.data 

            };
        } else {
            return { success: false, message: data.message };
        }
    },

    addMemberRelations: async ({ memberId, relationType, relatedMemberId }) => {
        try {
          const res = await fetch("/api/treemembers/addRelations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ memberId, relationType, relatedMemberId }),
          });
      
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to add relation.");
          }
      
          const data = await res.json();
      
          set((state) => {
            const updatedMembers = state.familyMembers.map(member => {
              if (member._id === memberId) {
                const updatedRelations = { ...member.relations };
      
                if (relationType === "child") {
                  updatedRelations.children = [...(updatedRelations.children || []), relatedMemberId];
                } else if (relationType === "spouse") {
                  updatedRelations.spouses = [...(updatedRelations.spouses || []), relatedMemberId];
                } else if (relationType === "parent") {
                  updatedRelations.parents = [...(updatedRelations.parents || []), relatedMemberId];
                }
      
                return { ...member, relations: updatedRelations };
              }
              return member;
            });
            return { familyMembers: updatedMembers };
          });
      
          return { success: true, message: "Relation added successfully." };
        } catch (error) {
          console.error("Error adding relation:", error.message);
          return { success: false, message: error.message };
        }
      },
      
    updateFamilyMember: async (id, updates) => {
      try {
        const res = await fetch(`/api/treemembers/updateMember/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          throw new Error(data.message || "Failed to update member.");
        }
    
        return { success: true, data: data.data };
      } catch (error) {
        console.error("Update Error:", error.message);
        return { success: false, message: error.message };
      }
    },
      

    deleteFamilyMember: async (id) => {
        await fetch(`/api/treemembers/deleteMember/${id}`, { method: "DELETE" });
        set((state) => ({ familyMembers: state.familyMembers.filter(m => m._id !== id) }));
    }
}));

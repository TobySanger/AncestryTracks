import { create } from "zustand";

export const useFamilyMemberStore = create((set) => ({
    familyMembers: [],

    setFamilyMembers: (familyMembers) => set({ familyMembers }),

    fetchFamilyMembers: async (treeId) => {
        try {
            const res = await fetch(`/api/treemembers/${treeId}`);
            const data = await res.json();
            set({ familyMembers: data.data || [] }); // Default to empty array if no data
        } catch (error) {
            console.error("Error fetching members", error);
            set({ familyMembers: [] }); //
        }
        
    },

    addFamilyMember: async (newMember) => {
        const res = await fetch("/api/treemembers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMember),
        });
        const data = await res.json();

        if (data.success) {
            set((state) => ({ familyMembers: [...state.familyMembers, data.data] }));
            return { success: true, message: "Family member added successfully" };
        } else {
            return { success: false, message: data.message };
        }
    },

    deleteFamilyMember: async (id) => {
        await fetch(`/api/treemembers/${id}`, { method: "DELETE" });
        set((state) => ({ familyMembers: state.familyMembers.filter(m => m._id !== id) }));
    }
}));

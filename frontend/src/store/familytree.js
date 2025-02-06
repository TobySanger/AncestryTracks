import {create} from "zustand"

export const useFamilytreeStore = create((set) => ({
    familytrees: [],
    setFamilytrees: (familytrees) => set({ familytrees }),
    createFamilytree: async (newFamilytree) => {
        if (!newFamilytree.name || !newFamilytree.description || !newFamilytree.image) {
            return {success: false, message:"Please fill in all fields."};
        }
        const res = await fetch("/api/familytrees", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newFamilytree),
        });
        const data = await res.json();
        set((state) => ({ familytrees: [...state.familytrees, data.data] }));
        return {success: true, message: "Family tree created successfuly"};
    },

    fetchFamilytrees: async () => {
        const res = await fetch("/api/familytrees");
        const data = await res.json();
        set({ familytrees: data.data });
    },

    deleteFamilytree: async (pid) => {
        const res = await fetch(`/api/familytrees/${pid}`, {
            method: "Delete",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Updates the ui immediately
        set((state) => ({ familytrees: state.familytrees.filter((familytree) => familytree._id !== pid) }));
        return { success: true, message: data.message };
    }
}));
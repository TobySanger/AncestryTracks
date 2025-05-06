// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy
// Some elements of this code are based on the MERN stack tutorial by freeCodeCamp.org on YouTube.

// Description :
// This file defines a Zustand store for managing the state related to family trees on the frontend.
// It includes state variables and async functions to create, fetch, and delete family trees,
// while keeping the UI in sync with the backend.

import {create} from "zustand" // State management library for React


export const useFamilytreeStore = create((set) => ({
    familytrees: [], // Holds an array of all family trees fetched from the backend

    // Manually set the familytrees array
    setFamilytrees: (familytrees) => set({ familytrees }),

    // Function to create a new family tree
    // It takes a newFamilytree object as an argument
    // It checks if all required fields are filled in
    // If not, it returns an error message
    // If all fields are filled, it sends a POST request to the backend API
    // After a successful creation, it updates the familytrees state with the new tree
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

    // Function to update an existing family tree
    fetchFamilytrees: async () => {
        const res = await fetch("/api/familytrees"); // Fetch all family trees from the backend API
        const data = await res.json(); // Parse the JSON response
        set({ familytrees: data.data }); // Update the store with the fetched family trees
    },

    // Function to send a Delete request to remove a specific family tree by ID
    // It takes the family tree ID (pid) as an argument
    // After a successful deletion, it updates the familytrees state by filtering out the deleted tree
    
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
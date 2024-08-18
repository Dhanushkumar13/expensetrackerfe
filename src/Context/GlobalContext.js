import { createContext, useContext, useState } from "react";
import axios from 'axios';

// Backend URL
const BASE_URL = "https://expensetracker-be-i3d0.onrender.com/api/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            console.log('Expense added:', response.data);
        } catch (err) {
            console.error("Error adding expense:", err.response?.data?.message || "An error occurred");
            setError(err.response?.data?.message || "An error occurred");
        }
        getExpense();
    };
    

    const getExpense = async() =>{
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data);
        console.log(response.data);
    }

    const deleteExpense = async(id) => {
        console.log("Deleting expense with id:", id);
        try {
            const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpense();
        } catch (error) {
            console.error("Error deleting expense:", error);
            setError("Failed to delete expense.");
        }
    };
    

    const totalExpense = () =>{
        let expenseCalc = 0;
        expenses.forEach((expense)=>{
            expenseCalc = expenseCalc + expense.amount
        })

        return expenseCalc;
    }

    return (
        <GlobalContext.Provider value={{addExpense, getExpense, deleteExpense, totalExpense, expenses, setError}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

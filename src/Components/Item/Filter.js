import React, { useState } from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import styled from 'styled-components';
import { dateFormat } from '../../Utilities/dateFormat';

export default function Filter() {
    const {expenses} = useGlobalContext();

    const [sort, setSort] = useState('date');
    const [filterCategory, setFilterCatgory] = useState('all');
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);

    const handleSortChange = (e) =>{
        const option = e.target.value;
        setSort(option);
        sortAndFilterExpenses(filteredExpenses, option, filterCategory);
    }

    const handleFilterChanege = (e) =>{
        const category= e.target.value;
        setFilterCatgory(category);
        sortAndFilterExpenses(expenses, sort, filterCategory); 
    }

    const sortAndFilterExpenses = (expensesList, sortBy, category) =>{
        let sortedFilter = [...expensesList];

        if(category !== 'all'){
            sortedFilter  = sortedFilter.filter(expense => expense.category === category);

        }

        sortedFilter.sort((a,b)=>{
            switch(sortBy){
                case 'amount':
                    return b.amount - a.amount;
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                default:
                    return 0;
            }
        })

        setFilteredExpenses(sortedFilter);
    }

  return (
    <ExpenseListStyled>
        <div className='filters'>
            <select value={sort} onChange={handleSortChange}>
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
            </select>

            <select value={filterCategory} onChange={handleFilterChanege}>
                    <option value="" disabled >Select Option</option>
                    <option value="all">All Categories</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option> 
            </select>

            <div className='expense-list'>
                {filteredExpenses.map(expense =>(
                    <div className='expense-item' key={expense._id}>
                        <div>{dateFormat(expense.date)}</div>
                        <div>{dateFormat(expense.category)}</div>
                        <div>{dateFormat(expense.amount)}</div>
                        <div>{dateFormat(expense.description)}</div>
                    </div>
                ))}
            </div>
        </div>
    </ExpenseListStyled>
  )
}


const ExpenseListStyled = styled.div`
    .filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        select {
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
    }

    .expense-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .expense-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            background: #f9f9f9;
        }
    }
`;
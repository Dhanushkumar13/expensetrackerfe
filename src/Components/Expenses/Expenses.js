import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layout';
import { useGlobalContext } from '../../Context/GlobalContext';
import Form from './ExpenseForm';
import Item from '../Item/Item';
import Filter from '../Item/Filter';

export default function Dashboard() {
    
    const {expenses,deleteExpense, totalExpense, getExpense} = useGlobalContext()

    useEffect(()=>{
        getExpense()
    },[getExpense])

    return (
    <ExpenseStyled>
        <InnerLayout>
            <h1>Expense</h1>
            <h2 className='total-expense'>Total Expense:<span>${totalExpense()}</span></h2>
                <div className='expense-content'>
                    <div className='form-container'>
                        <Form/>
                    </div>
                    <div className='expenses'>
                        <Filter/>
                        {expenses.map((expense)=>{
                            const {_id, amount, date, category, description, type} = expense;
                            return <Item
                                    key={_id}
                                    id={_id}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    description={description}
                                    indicatorColor= "var(--color-green)"
                                    deleteItem={deleteExpense}
                                />
                        })} 
                    </div>
                </div>
        </InnerLayout>
    </ExpenseStyled>
  );    
}

const ExpenseStyled = styled.div`
display: flex;
overflow: hidden;
.total-expense{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: .5rem;
    span{
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-green);
    }
}
.expense-content{
    display: flex;
    gap: 2rem;
    .expenses{
        flex: 1;
    }
}
`;
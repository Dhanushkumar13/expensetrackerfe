import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layout';
import PieChart from '../Chart/PieChart'
import Chart from '../Chart/Chart';
import { useGlobalContext } from '../../Context/GlobalContext';
import { dollar } from '../../Utilities/Icons';

export default function Dashboard() {
  const {totalExpense, expenses} = useGlobalContext()

  const totalNumberOfExpenses = expenses.length;
  const averageExpense = totalNumberOfExpenses ? totalExpense() / totalNumberOfExpenses : 0;
  const largestExpense = expenses.reduce((max, expense) => expense.amount > max ? expense.amount : max, 0);
  const smallestExpense = expenses.reduce((min, expense) => expense.amount < min ? expense.amount : min, Infinity);

  const convertCSV = (data) =>{
    const header = ['Date', 'Amount', 'Category', 'Description']
    const rows = data.map(expense =>[
      expense.date,
      expense.amount,
      expense.category,
      expense.description,
    ]);
    
    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    return csvContent;
  }

  const downloadCSV = () =>{
    const csvData = convertCSV(expenses);
    const blob = new Blob([csvData], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'expenses.csv');
    link.click();
  }
  return (
    <DashboardStyled>
        <InnerLayout>
            <h1>All Expenses</h1>
            <div className='stats-con'>
              <div className='chart-con'>
                <div className='con'> 
                  <Chart/>
                  <PieChart/>
                </div>
                <div className='amount-con'>
                  <div className='expense'>
                    <h2>Total Expense</h2>
                    <p> {dollar} {totalExpense()}</p>
                  </div>
                  <div className='summary'>
                <h2>Expense Summary</h2>
                <p>Total Number of Expenses: {totalNumberOfExpenses}</p>
                <p>Average Expense: {dollar} {averageExpense}</p>
                <p>Largest Expense: {dollar} {largestExpense}</p>
                <p>Smallest Expense: {dollar} {smallestExpense}</p>
              </div>
              <div>
                <button onClick={downloadCSV}>Download CSV</button>
              </div>
                </div>
              </div>
            </div>
        </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            .line-chart, .pie-chart{
            flex:1;
            }
                  .con {
                    display: flex; 
                    flex: 1;
                    gap: 2rem; 
                    height: 300px;
                    padding-bottom: 20px
                    
                    }
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .expense{
                    grid-column: span 2;
                }
                .expense{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
                    .summary{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    width: 220%;
                    height: 100%;  
                    }
                    button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--color-dark-accent);
    }
  }
`;

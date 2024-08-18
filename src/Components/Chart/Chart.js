import React from 'react'
import {Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'

import {Line} from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/GlobalContext';
import { dateFormat } from '../../Utilities/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

export default function Chart() {

    const {expenses} = useGlobalContext()

    const data = {
        labels: expenses.map((exp)=>{
            const {date} = exp
            return dateFormat(date);
        }),
        datasets: [
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((exp)=>{
                        const {amount} = exp
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2,
            }
        ]
    }
  return (
    <ChartStyled>
        <Line data={data} />
    </ChartStyled>
  )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    width: 95%;
`;
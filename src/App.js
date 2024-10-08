import React, { useState } from "react";
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from "./Styles/Layout";
import Orb from "./Components/Button/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Expense from "./Components/Expenses/Expenses";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useGlobalContext } from "./Context/GlobalContext";


function App() {
  const [active, setActive] = useState(1)

const global = useGlobalContext();
console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Expense />
      default: 
        return <Dashboard/>
    }
  }

  return (
    <AppStyled bg={bg} className="App">
      <Orb/>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
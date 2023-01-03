import React from 'react';
import styled from 'styled-components'
import {CloseIcon} from "../../contants";


const Main = styled.div`
  margin: 1rem 2rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
  background: #1363DF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 5px 5px 5px 5px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p {
    padding: 0.5rem;
    font-size: 2rem;
    font-weight: 300;
  }
  
  .closeIcon {
    height: 3rem;
    width: 3rem;
  }
  
`


function InnerAlert({name,role}) {
    return (
        <Main>
            <p>
                Welcome , {name} ({role})
            </p>
            <div>
                {/*<img className='closeIcon' src={CloseIcon} alt="closeicon" />*/}
            </div>
        </Main>
    );
}

export default InnerAlert;
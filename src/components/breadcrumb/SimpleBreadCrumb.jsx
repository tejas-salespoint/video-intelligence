import React from 'react';
import styled from 'styled-components'


const Main = styled.div`
  margin: 1rem;
  p {
    font-weight: 400;
    font-size: 1.5rem;
  }
  
 
  //
  //display: flex;
  //justify-content: space-between;
  //align-items: center;

`


function SimpleBreadCrumb({root}) {
    return (
        <Main>
            <p className='fw-bold'>
                {root}
            </p>

        </Main>
    );
}

export default SimpleBreadCrumb;
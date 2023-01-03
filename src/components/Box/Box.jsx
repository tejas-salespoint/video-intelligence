import React from 'react';
import styled from 'styled-components'


const Main = styled.div`
  margin: 2rem;
  
`


function Box({children, ...props}) {
    return (
        <Main {...props}>
            {children}
        </Main>
    );
}

export default Box;
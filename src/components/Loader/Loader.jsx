import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Loader = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: props?.height ? props?.height : '100vh'
        }}>
            <CircularProgress/>
        </Box>
    );
};

export default Loader;
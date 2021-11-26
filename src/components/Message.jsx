import React from 'react'
import Alert from '@mui/material/Alert';

const Message = ({ variant, children }) => {
    return (
        <Alert severity={variant}>
            {children}
        </Alert>
    )
}

export default Message

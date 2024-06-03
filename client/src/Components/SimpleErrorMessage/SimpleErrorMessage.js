import React from 'react';

function SimpleErrorMessage({ message }) {
    return message ? <p style={{ color: 'red' }}>{message}</p> : null;
}

export default SimpleErrorMessage;

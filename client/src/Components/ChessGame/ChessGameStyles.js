import styled from "styled-components";
// import React from "react";

export const ChessContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    height: 100vh;
    box-sizing: border-box;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const PlayAgainButton = styled.button`
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;  
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #45a049; 
    }
`;


export const GameOverMessage = styled.div`
    color: #fff;
    background-color: #333;
    font-weight: bold;
    font-size: 24px;  /* Increase font size */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* Center the message */
    padding: 20px 30px;  /* Increase padding */
    border-radius: 8px;  /* Larger border radius */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);  /* Darker shadow */
    z-index: 1000;  /* Ensure it appears above other elements */
    text-align: center;  /* Center text */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


export const ResignButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    &:hover {
        background-color: darkred;
    }
`;

import styled from 'styled-components';




export const MovesContainer = styled.div`
    width: 300px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 600px;  // Set max-height to make the container shorter
    @media (max-width: 768px) {
        width: 100%;
        max-height: 30vh;
    }
`;


export const MovesTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 18px;
    font-family: 'Arial', sans-serif;
`;

export const MovesRow = styled.tr`
    &:nth-child(odd) {
        background: #f9f9f9;
    }
`;

export const MoveNumber = styled.td`
    width: 30px;
    text-align: right;
    padding-right: 10px;
    font-weight: bold;
`;

export const MoveCell = styled.td`
    text-align: left;
    padding-left: 10px;
`;

export const MovesSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
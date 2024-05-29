import styled from 'styled-components';

export const ChessContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(to bottom right, #f0f0f0, #d0d0d0);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    height: 100vh;
    box-sizing: border-box;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const PlayerSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;
    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

export const BoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

export const BoardContainer = styled.div`
    position: relative;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: white;
`;

export const MovesSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
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

export const GameOverMessage = styled.p`
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

export const PlayerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const PlayerLogo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
    border: 2px solid #ccc;
`;

export const PlayerName = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;

import styled from "styled-components";

export const PlayerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4vh;
`;

export const PlayerLogo = styled.img`
    width: 8vh;
    height: 8vh;
    border-radius: 50%;
    margin-right: 1%;
    object-fit: cover;
    border: 0.2rem solid #ccc;
`;



export const PlayerName = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #333;
`;

export const PlayerSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 5%;
    margin-top: -2%;
    height: 100%;
    gap: 30vh;
`;
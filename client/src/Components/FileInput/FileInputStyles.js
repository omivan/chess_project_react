import styled from "styled-components";

export const FileInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const CustomFileInput = styled.input`
    display: none;
`;

export const CustomFileLabel = styled.label`
    background-color: #717171;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1em;
    border-radius: 20px;
    
    &:hover {
        background-color: #ffffff;
        color: #717171;
        transition: background-color 0.5s, color 0.5s;
    }
`;
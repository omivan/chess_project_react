// src/styles/index.js
import styled from 'styled-components';

export const MetadataContainer = styled.div`
    text-align: left;
`;

export const MetadataList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const MetadataItem = styled.li`
    margin: 5px 0;
`;

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



import React from 'react';
import {CustomFileInput, CustomFileLabel, FileInputContainer} from "./ImportStyles";

function FileInput({ onFileImport }) {
    const handleImport = (event) => {
        const file = event.target.files[0];
        onFileImport(file);
    };

    return (
        <FileInputContainer>
            <CustomFileInput type="file" id="file-input" onChange={handleImport} accept=".pgn" />
            <CustomFileLabel htmlFor="file-input">Choose File</CustomFileLabel>
        </FileInputContainer>
    );
}

export default FileInput;

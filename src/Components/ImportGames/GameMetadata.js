// src/components/GameMetadata.js
import React from 'react';
import { MetadataContainer, MetadataList, MetadataItem } from './ImportStyles';

const GameMetadata = ({ metadata }) => (
    <MetadataContainer>
        <h3>Game Metadata</h3>
        <MetadataList>
            {Object.entries(metadata).map(([key, value]) => (
                <MetadataItem key={key}><strong>{key}:</strong> {value}</MetadataItem>
            ))}
        </MetadataList>
    </MetadataContainer>
);

export default GameMetadata;

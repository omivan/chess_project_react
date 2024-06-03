import React from 'react';
import { PlayerContainer, PlayerLogo, PlayerName } from './PlayerStyles';

const PlayerInfo = ({ name, logo }) => (
    <PlayerContainer>
        <PlayerLogo src={logo} alt={`${name}'s logo`} />
        <PlayerName>{name}</PlayerName>
    </PlayerContainer>
);

export default PlayerInfo;

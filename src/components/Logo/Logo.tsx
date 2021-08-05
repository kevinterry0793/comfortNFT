import React from 'react'
import strainLogo from '../../assets/comfortbig.png'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Logo: React.FC = () => {
    let history = useHistory();

    function imageClick() {
        history.push('/');
    }


    return (
        <StyledImage>
            <img src={strainLogo} alt="Logo" height={58} onClick={() => imageClick()} />
        </StyledImage>
    )
};

const StyledImage = styled.div`
    cursor: pointer;
`;

export default Logo

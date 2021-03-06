import React from 'react'
import styled from 'styled-components'

import Footer from '../Footer'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>
      {children}
    </StyledMain>
    <Footer />
  </StyledPage>
)

// background-color: #08182E !important;

const StyledPage = styled.div`
background-color: #101317 !important;`

const StyledMain = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 144px);
`
// padding: ${props => props.theme.spacing[6]}px 0;

export default Page

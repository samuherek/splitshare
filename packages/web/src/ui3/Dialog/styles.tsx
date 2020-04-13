import styled from 'styled-components';
import Paper from '../Paper';

const PaperBase = styled(Paper)`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  flex: 0 1 auto;

  @media print {
    overflow-y: visible;
    box-shadow: none;
  }
`;

export const PaperDefault = styled(PaperBase)`
  margin: 48px;
  max-height: calc(100% - 96px);
  max-width: 600px;
`;

export const PaperFullscreen = styled(PaperBase)`
  width: 100%;
  height: 100%;
  border-radius: 0;
`;

import styled from 'styled-components';

export const AvatarBase = styled.div<{ size: number }>`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  justify-content: center;

  .AvatarImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    text-align: center;
  }
`;

export const Circle = styled(AvatarBase)`
  border-radius: 50%;
`;

import * as React from 'react';
import styled from '../../styles/styled-components';

const AvatarStyled: any = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #eee;
  border: none;
  /* cursor: pointer; */
  font: inherit;
  text-transform: uppercase;
`;

interface IProps {
  name: string | null;
  url?: string | null;
  style?: React.CSSProperties;
}

export const AvatarUser: React.FC<IProps> = ({
  name,
  url,
  style,
  ...props
}) => {
  return (
    <AvatarStyled style={style} {...props}>
      {url ? <img src={url} /> : <span>{name ? name.substr(0, 1) : ''}</span>}
    </AvatarStyled>
  );
};

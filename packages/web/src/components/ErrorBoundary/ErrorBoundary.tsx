import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import Typography from '../../ui/Typography';

type Props = {
  children: any;
  className?: string;
};

type State = {
  error: Error | null;
};

export const classes = {
  root: 'ErrorBoundary',
};

const WrapStyled = styled.div`
  text-align: center;

  svg {
    font-size: 40px;
    margin: 0 auto 10px auto;
  }

  h3 {
    margin-bottom: 10px;
  }
`;

const ErrorValueWrapStyled = styled.pre`
  background: #e7eff3;
  padding: 7px;
  border-radius: 4px;
  width: auto;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  font-size: 13px;
  max-height: 50px;
  overflow: auto;
`;

class ErrorBoundary extends React.PureComponent<Props, State> {
  state = { error: null };

  componentDidCatch(error: Error) {
    console.error(error);
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children, className } = this.props;

    if (error) {
      // @ts-ignore
      const msg = error.toString();

      return (
        <WrapStyled
          style={{ textAlign: 'center' }}
          className={clsx(className, classes.root)}
        >
          <Typography component="h3">Noo.... It's not your fault.</Typography>
          <ErrorValueWrapStyled>{msg}</ErrorValueWrapStyled>
        </WrapStyled>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

import React from 'react';
import Typography from './Typography';

export default {
  title: 'Data display/Typography',
  component: Typography,
};

export const All = () => (
  <>
    <Typography variant="h1">H1</Typography>
    <Typography variant="h2">H2</Typography>
    <Typography variant="h3">H3</Typography>
    <Typography variant="h4">H4</Typography>
    <Typography variant="h5">H5</Typography>
    <Typography variant="h6">H6</Typography>
    <Typography variant="paragraph">Paragraph</Typography>
    <Typography variant="subtitle">Subtitle</Typography>
  </>
);

export const Body = () => (
  <>
    <Typography variant="paragraph" size="small">
      Small
    </Typography>
    <Typography variant="paragraph" size="medium">
      Medium
    </Typography>
    <Typography variant="paragraph" size="large">
      Large
    </Typography>
  </>
);

import { FC } from 'react';
import { Typography, Grid } from '@mui/material';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
}

const PageTitle: FC<PageTitleProps> = ({ heading = '', subHeading = '', docs = '', ...rest }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" {...rest}>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default PageTitle;

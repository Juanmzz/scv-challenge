import { Fragment } from "react";

//Material
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import PaymentsIcon from "@mui/icons-material/Payments";
import Grid from "@mui/material/Grid";

//Components 
import Investments from "../../components/Investments/Investments"

const Dashboard = () => {
  return (
    <Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }} justify="center" >
              Show Me My Money!
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex" }} />
            <Box sx={{ flexGrow: 0 }}>
              <PaymentsIcon />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container spacing={1}>
          <Grid item xs={12}>
            <Investments mode="mine"/>
          </Grid>
          <Grid item xs={12}>
            <Investments mode="not_mine"/>
          </Grid>
          </Grid>
       
        </Grid>
        <Grid item xs={8}>

        </Grid>
        </Grid>
    </Fragment>
  );
};

export default Dashboard;

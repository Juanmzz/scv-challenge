import React, { Fragment, useEffect, useState } from "react";

//Material
import { AppBar, Box, Container, Grid, Toolbar, Typography, Button } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import HomeIcon from '@mui/icons-material/Home';

//Router
import { Link, Route, useLocation } from "wouter";

//Components
import InvestmentDetail from "../../components/InvestmentDetail";
import Investments from "../../components/Investments";
import Summary from "../../components/Summary";
import API from "../../helper/apiClient";

const Dashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [savingAccount, setSavingAccount] = useState([]);
  const [location] = useLocation();

  const searchInvestments = async () => {
    API.get("/investment?currentQuotes=true").then((res) => {
      setInvestments(res.data);
    });
  };

  const searchSavingAccount = async () => {
    API.get("/saving-account").then((res) => {
      setSavingAccount(res.data);
    });
  };

  useEffect(() => {
    searchInvestments();
    searchSavingAccount();
  }, []);
  return (
    <Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2 }}
              justify="center"
            >
              Show Me My Money!
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex" }} >
              {location !== '/' && (
                <Link to='/'>
                  <Button variant="contained" startIcon={<HomeIcon />} >
                    Return
                  </Button>
               </Link>
              )}
            </Box>
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
              <Investments
                mode="mine"
                investments={investments}
                savingAccount={savingAccount}
              />
            </Grid>
            <Grid item xs={12}>
              <Investments mode="not_mine" investments={investments} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>

        <Route path="/">
          {<Summary investments={investments} savingAccount={savingAccount} /> }
        </Route>
        {/* <Route component={Summary({investments,savingAccount}) } path="/"/> */}
        <Route component={InvestmentDetail} path="/detail/:investmentId"/> 


        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;

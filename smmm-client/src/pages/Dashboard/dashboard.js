import { createContext, Fragment, useEffect, useState } from "react";

//Material
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  AppBar, Button, Container,
  Grid,
  Toolbar
} from "@mui/material";

//Router
import { Link, Route } from "wouter";

//Components
import InvestmentDetail from "../../components/InvestmentDetail";
import Investments from "../../components/Investments";
import Summary from "../../components/Summary";
import API from "../../helper/apiClient";

export const DashboardContext = createContext();

const Dashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [savingAccount, setSavingAccount] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const contextValues = { refreshData, setRefreshData }

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
  }, [refreshData]);



  return (
    <DashboardContext.Provider value={contextValues}>
      <Fragment>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
    
                <Link to="/">
                  <Button variant="contained" startIcon={<PaymentsIcon />}>
                    Show Me My Money!
                  </Button>
                </Link>
           
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
              {
                <Summary
                  investments={investments}
                  savingAccount={savingAccount}
                />
              }
            </Route>
            <Route path="/detail/:investmentId">
              {params => <InvestmentDetail investmentId={params.investmentId} />}
            </Route>

          </Grid>
        </Grid>
      </Fragment>
    </DashboardContext.Provider>
  );
};

export default Dashboard;

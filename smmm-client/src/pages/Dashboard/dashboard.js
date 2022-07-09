import React, { Fragment, useEffect, useState } from "react";
//Material
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import PaymentsIcon from "@mui/icons-material/Payments";
import Grid from "@mui/material/Grid";

import API from "../../helper/apiClient";

//Components
import Investments from "../../components/Investments";
import Summary from "../../components/Summary";

const Dashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [savingAccount, setSavingAccount] = useState([]);

  const searchInvestments = async () => {
    API.get("/investment").then((res) => {
      setInvestments(res.data);
    });
  };

  const searchSavingAccount = async () => {
    API.get("/saving-account").then((res) => {
      setSavingAccount(res.data[0]);
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
            <Summary investments={investments} savingAccount={savingAccount}></Summary>

        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;

import { Typography, TableContainer, TableRow, Table, TableBody,TableHead } from "@mui/material";

import React, { useState, useEffect } from "react";
import SavingAccount from "../SavingAccount/SavingAccount";
import API from "../../helper/apiClient";

import CssBaseline from "@mui/material/CssBaseline";
const MyInvestments = () => {
  const [savingAccount, setSavingAccount] = useState(null);

  const searchSavingAccount = async () => {
    API.get("/saving-account").then((res) => {
      const savingAccount = res.data[0];
      setSavingAccount(savingAccount);
    });
  };

  useEffect(() => {
    searchSavingAccount();
  }, []);

  return (

    <TableContainer  style={{marginTop: "40px" }}>
      <Table>
          <TableHead>
          <Typography variant="h4">My Investments</Typography>

          </TableHead>
        <TableBody>
          <TableRow>
            <SavingAccount savingAccount={savingAccount} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyInvestments;

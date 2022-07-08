import { Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../helper/apiClient";
import SavingAccount from "../SavingAccount/SavingAccount";


const Investments = props => {
  const [savingAccount, setSavingAccount] = useState(null);

  const searchSavingAccount = async () => {
    API.get("/saving-account").then((res) => {
      const savingAccount = res.data[0];
      setSavingAccount(savingAccount);
    });
  };
  const title = props.mode === 'mine' ? 'My Investments' : 'Other Investments';


  useEffect(() => {
    searchSavingAccount();
  }, []);

  return (

    <TableContainer  style={{marginTop: "40px" }}>
      <Table>
          <TableHead>
          <Typography variant="h4">{title}</Typography>

          </TableHead>
        <TableBody>
          {props.mode === 'mine' && (
          <TableRow>
            <SavingAccount savingAccount={savingAccount} />
          </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Investments;

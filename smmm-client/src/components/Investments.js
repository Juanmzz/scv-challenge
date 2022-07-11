import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import SavingAccount from "./SavingAccount";
import { capitalizeFirst } from "../helper/utils";
import { Link, useLocation } from "wouter";

const Investments = (props) => {
  const [location] = useLocation();

  const mine = props.mode === "mine";
  const title = props.mode === "mine" ? "My Investments" : "Other Investments";
  const savingAccount = props.savingAccount ? props.savingAccount : [];

  const getInvestments = () => {
    if (mine) {
      // my investments => investments that I have some (quantitiy > 0)
      return props.investments.filter((x) => x.quantity > 0);
    } else {
      // other investments => investments that I don't have (quantitiy = 0)
      return props.investments.filter((x) => x.quantity === 0);
    }
  };

  const getSelectedInvestment = (id) => {
    return location === `/detail/${id}`;
  };

  useEffect(() => {}, []);

  return (
    <TableContainer style={{ marginTop: "40px" }}>
      <Typography variant="h5">{title}</Typography>
      <Table>
        <TableBody>
          {mine && (
            <TableRow>
              <SavingAccount savingAccount={savingAccount} />
            </TableRow>
          )}

          {getInvestments().map((inv, i) => (
            <Link key={inv._id} to={`/detail/${inv._id}`}  >
              <TableRow key={inv._id} selected={getSelectedInvestment(inv._id)} style={{ cursor: 'pointer' }}>
                <TableCell>
                  {capitalizeFirst(inv.type) + " " + inv.name}{" "}
                </TableCell>

                {mine && <TableCell> ( {inv.quantity + " Units"} ) </TableCell>}
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Investments;

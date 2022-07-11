import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
  } from "@mui/material";
import {capitalizeFirst} from "../helper/utils"
import SavingAccount from "./SavingAccount";
import {formatNumber} from "../helper/utils"

const Summary = ({investments, savingAccount}) => {

    const myInvesments = investments.filter((x) => x.quantity > 0);

    const getTotal = () => {
        let  total = savingAccount.value;
        myInvesments.forEach(element => {
            total += getCurrentValue(element);
        });
        return formatNumber(total);
    }

    const getCurrentValue = (investment) => {
        return investment?.currentQuote * investment.quantity;
    }

  return (
    <TableContainer style={{ marginTop: "40px" }}>
      <Typography variant="h5"> Financial Portfolio (Total:{getTotal()})</Typography>
      <Table>
        <TableBody> 
            <TableRow >
             <SavingAccount savingAccount={savingAccount} />
            </TableRow> 
          {myInvesments.map((inv, i) => (

            <TableRow key={inv._id}>
              <TableCell>{capitalizeFirst(inv.type) + " " + inv.name} </TableCell>
              <TableCell>( {formatNumber(getCurrentValue(inv))} )</TableCell>
            </TableRow>
          ))}
         </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Summary;

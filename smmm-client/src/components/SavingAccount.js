import { TableCell } from "@mui/material";
import {formatNumber} from "../helper/utils";

const SavingAccount = ({savingAccount}) => {

  return (
    <>
      <TableCell>Saving Account</TableCell>
      <TableCell>  ( {formatNumber(+savingAccount?.value) } )</TableCell>
    </>
  );
};

export default SavingAccount;

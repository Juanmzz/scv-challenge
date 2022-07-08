import { TableCell } from "@mui/material";

const SavingAccount = ({savingAccount}) => {

  return (
    <>
      <TableCell>Saving Account</TableCell>
      <TableCell> {savingAccount?.currency + savingAccount?.value } </TableCell>
    </>
  );
};

export default SavingAccount;

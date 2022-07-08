import { TableCell } from "@mui/material";

const SavingAccount = ({savingAccount}) => {
  console.log(savingAccount);

    // const money = savingAccount.currency + savingAccount.value 
  return (
    <>
      <TableCell>Saving Account</TableCell>
      <TableCell> {savingAccount?.currency + savingAccount?.value } </TableCell>
    </>
  );
};

export default SavingAccount;

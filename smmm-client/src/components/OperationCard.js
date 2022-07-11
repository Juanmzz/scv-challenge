import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Avatar,
  Box, Button, Card,
  CardContent, FormControl, Grid, InputLabel, OutlinedInput, Typography
} from "@mui/material";
import { useContext, useState } from "react";
import { useLocation } from "wouter";
import API from "../helper/apiClient";
import { formatNumber } from "../helper/utils";
import { DashboardContext } from "../pages/Dashboard/dashboard";

const OperationCard = (props) => {
  const [, setLocation] = useLocation();
  const [quantityOperation, setQuantityOperation] = useState(0);
  const mode = props.mode;
  const title = props.mode.toString().toUpperCase();
  const investment = props.investment;
  const { refreshData, setRefreshData } = useContext(DashboardContext);

  const handleQuantityChange = (e) => {
     
    setQuantityOperation(e.target.value);
  };

  const calcuteValue = () => {
    return quantityOperation * investment.currentQuote;
  };

  const backToDashboard = () => {

    setLocation("/");
    setRefreshData(!refreshData);
  }

  const doOperation = () => {
    const url = "/investment/" + mode;

    API.post(url, {
      investmentId: investment._id,
      quantity: +quantityOperation,
      currentQuote: investment.currentQuote,
    }).then((res) => {
      alert(res.data.message);
      backToDashboard();
    }).catch(err => {alert(err.response.data.message)} );


  };

  return (
    <Box mt={2}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "primary.dark",
                  height: 24,
                  width: 24,
                }}
              >
                {props.mode === "buy" && <AddCircleIcon />}

                {props.mode === "sell" && <RemoveCircleIcon />}
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
      
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Units</InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type='number'
                    value={quantityOperation}
                    onChange={handleQuantityChange}
                    label="Units"
                  />
                </FormControl>
                <Typography color="textPrimary" variant="h4">
                  {formatNumber(calcuteValue())}
                </Typography>
              </Grid>
           
              <Grid container spacing={2} justifyContent="flex-end">

                <Button
                  variant="contained"
                  onClick={() => {
                    doOperation();
                  }}
                >
                  {" "}
                  {title}
                </Button>

              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OperationCard;

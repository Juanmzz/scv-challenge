import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";
import API from "../helper/apiClient";
import { useLocation } from "wouter";

const OperationCard = (props) => {
  const [, setLocation] = useLocation();
  const [quantityOperation, setValue] = useState(0);
  const mode = props.mode;
  const title = props.mode.toString().toUpperCase();
  const investment = props.investment;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const calcuteValue = () => {
    return quantityOperation * investment.currentQuote;
  };

  const backToDashboard = () => {
    setLocation("/");
  }

  const doOperation = () => {
      const url = "/investment/" + mode;

      API.post(url, {
        investmentId: investment._id,
        quantity: quantityOperation,
        currentQuote: investment.currentQuote,
      }).then((res) => {
        alert(res.data.message);
        backToDashboard();
      });
    
 
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
              <Grid item xs={5}>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  value={quantityOperation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography color="textPrimary" variant="h4">
                  $ {calcuteValue()}
                </Typography>
              </Grid>
              <Grid item xs={3}>
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

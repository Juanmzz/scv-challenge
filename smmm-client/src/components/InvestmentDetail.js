import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import API from "../helper/apiClient";
import { capitalizeFirst } from "../helper/utils";
import OperationCard from "./OperationCard";
import { useLocation } from "wouter";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f7f7",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
}));

const InvestmentDetail = ({ investmentId, doRefresh }) => {

  const [inv, setInvestment] = useState(null);
  const [, setLocation] = useLocation();

  const getCurrentValue = () => {
    return inv.quantity * inv.currentQuote;
  };


  useEffect(() => {

    API.get("/investment/" + investmentId).then((res) => {
      setInvestment(res.data);
    }).catch((err) => { 
      alert(err.response.data.message);
      setLocation('/');
    });
  }, [investmentId, setLocation]);

  if (!inv) {
    return (
      <Box m={10} sx={{ alignItems: "center" }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box m={2} pt={3}>
        <Container>
          <Typography
            variant="h3"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            {inv && capitalizeFirst(inv.type) + " " + inv.name}
          </Typography>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Values
              </Typography>
            </CardHeader>
            <CardContent>
              <Stack spacing={2}>
                <Item>Quantitiy: {`${inv.quantity} Units`}</Item>
                <Item>Quote: {`${inv.currentQuote} / Unit`}</Item>
                <Item>Current Value: {getCurrentValue()}</Item>
              </Stack>
            </CardContent>
            <CardActions></CardActions>
          </Card>
          <Box mt={5} sx={{ alignItems: "center" }}>
            <OperationCard mode="buy" investment={inv} ></OperationCard>
            <OperationCard mode="sell" investment={inv} ></OperationCard>
          </Box>
        </Container>
      </Box>
    );
  }
};

export default InvestmentDetail;

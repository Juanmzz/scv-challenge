import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Stack,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const InvestmentDetail = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Values
        </Typography>
      </CardHeader>
      <CardContent>
        <Stack spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
        {/* <Typography variant="h5" component="div">
                    test
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography> */}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default InvestmentDetail;

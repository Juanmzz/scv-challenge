import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
  Box,
  Container
} from "@mui/material";
import { capitalizeFirst } from "../helper/utils"
import SavingAccount from "./SavingAccount";
import { formatNumber } from "../helper/utils";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = ({ investments, savingAccount }) => {

  const theme = useTheme();
  const myInvesments = investments.filter((x) => x.quantity > 0);

  const getTotal = () => {
    let total = savingAccount.value;
    myInvesments.forEach(element => {
      total += getCurrentValue(element);
    });
    return formatNumber(total);
  }

  const getCurrentValue = (investment) => {
    return investment?.currentQuote * investment.quantity;
  }

  const getChartData = () => {
    let arrData = [];
    if (myInvesments.length > 0) {
      arrData = [savingAccount.value];

      myInvesments.forEach(x => {
        arrData.push(getCurrentValue(x));
      });
    }

    return arrData;
  }

  const getChartLabels = () => {
    // return myInvesments.map( x => capitalizeFirst(x.type) + " " + x.name);
    const investmentNames = myInvesments.map(x => x.type + ' ' + x.name);
    const arrLabes = ['Saving Account', ...investmentNames]
    return arrLabes;
  }

  //chart config
  const data = {
    labels: getChartLabels(),
    datasets: [
      {
        data: getChartData(),
        backgroundColor: ['#003f5c', '#374c80', '#7a5195', '#bc5090', '#ef5675', "#ff764a"],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
  };
  
  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }

  };

  return (
    <Box mt={5}>
      <Container>
         <Typography variant="h5"> Portfolio (Total:{getTotal()})</Typography>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </Container>
      <TableContainer style={{ marginTop: "40px" }}>
       
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
    </Box>
  );
};

export default Summary;

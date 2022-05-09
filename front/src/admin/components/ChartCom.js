import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { useVacationsContext } from "../../shared/context/VacationsContext";

const ChartCom = () => {
  const { status, vacations } = useVacationsContext();
  const dataPerTarget = [];
  const dataPerId = [];

  vacations.forEach((x) => {
    dataPerTarget.push({
      argument: x.followers.length !== 0 && x.target,
      value: x.followers.length,
    });
    dataPerId.push({
      argument: x.target,
      value: x.followers.length,
    });
  });

  return (
    <>
      {!status && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Typography
        fontFamily="'Questrial', sans-serif"
        color="#464d29"
        variant="h1"
        fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
        textAlign="center"
        // mt={3}
        mb={3}
      >
        Vacations with followers
      </Typography>
      <Paper>
        <Chart data={dataPerTarget}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
      <Typography
        fontFamily="'Questrial', sans-serif"
        color="#464d29"
        variant="h1"
        fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
        textAlign="center"
        mt={3}
      >
        All vacations
      </Typography>
      <Paper sx={{ mt: 3, mb: 8 }}>
        <Chart data={dataPerId}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    </>
  );
};

export default ChartCom;

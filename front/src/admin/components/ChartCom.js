import React from "react";
import { Paper } from "@mui/material";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import  { useVacationsContext } from "../../shared/context/VacationsContext";


const ChartCom = () => {
  const {status,vacations}= useVacationsContext()
  const dataPerTarget = [];
  const dataPerId = [];


    vacations.forEach((x) => {
      dataPerTarget.push({
        argument: x.followers.length !== 0 && x.target,
        value: x.followers.length,
      });
      dataPerId.push({
        argument: x.followers.length !== 0 && x._id,
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
      <Paper>
        <Chart data={dataPerTarget}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
      <Paper sx={{mt:3,mb:5}}>
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

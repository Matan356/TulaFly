import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { useHttpClient } from "../../shared/hooks/http-hook";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";

const ChartCom = () => {
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main`
        );
        setLoadedVacations(responseData.vacation);
      } catch (err) {}
    };
    fetchVacations();
  }, [sendRequest]);

  const data = [];

  if (loadedVacations) {
    loadedVacations.forEach((x, i) => {

      data.push({
        argument:x.followers.length !== 0 &&x.target,
        value:x.followers.length
      });
    });
  }
  return (
    <>
      {isLoading && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    </>
  );
};

export default ChartCom;

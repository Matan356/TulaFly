import React, { useContext, useEffect, useState } from "react";
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
// import UserContext from "../../shared/context/UserContext";

const ChartCom = () => {
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading,sendRequest} = useHttpClient();
  // const {loadedVacations,fetchAllVacations} =useContext(UserContext)
  // const [fetching, setFetching] = useState(true)

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

  // useEffect(() => {
  //   if (!fetching) return
  //   fetchAllVacations();
    
  //   return ()=>{
  //     setFetching(false)
  //   }
  // }, [fetching, fetchAllVacations]);

  const dataPerTarget = [];
  const dataPerId = [];

  if (loadedVacations) {
    loadedVacations.forEach((x) => {
      dataPerTarget.push({
        argument: x.followers.length !== 0 && x.target,
        value: x.followers.length,
      });
      dataPerId.push({
        argument: x.followers.length !== 0 && x._id,
        value: x.followers.length,
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

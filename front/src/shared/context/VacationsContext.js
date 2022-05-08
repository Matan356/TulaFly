import { createContext, useCallback, useContext, useState } from "react";

const initialState = {
  status: false,
  vacations: [],
};

const VacationsContext = createContext(initialState);

const VacationsContextProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [vacations, setVacations] = useState([]);

  const updateStatus = (newStatus) => setStatus(newStatus);
  const updateVacations = (vacations) => setVacations(vacations);

  const fetchAllVacations = useCallback(
       async () => {
        updateStatus(false);
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}main`);
          const responseData = await response.json();
          updateStatus(true);
          updateVacations(responseData.vacation);
        } catch (err) {
          updateStatus(false);
        }
  }, []);

  return (
    <VacationsContext.Provider
      value={{
        status,
        vacations,
        updateStatus,
        updateVacations,
        fetchAllVacations,
      }}
    >
      {children}
    </VacationsContext.Provider>
  );
};

export const useVacationsContext = () => useContext(VacationsContext);
export default VacationsContextProvider;

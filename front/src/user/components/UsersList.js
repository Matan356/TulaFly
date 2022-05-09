import {
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const UsersList = (props) => {
  if (props.users.length === 0) {
    return (
      <div>
        <h2>No users found.</h2>
      </div>
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container maxWidth="xl">
      <TableContainer
        component={Paper}
        sx={{
          mt: 23,
          mb:15
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">index</StyledTableCell>
              <StyledTableCell align="right">User Name</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Vacations</StyledTableCell>
              <StyledTableCell align="right">Cart</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((user, i) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="right">{i + 1}</StyledTableCell>
                <StyledTableCell align="right">{user.userName}</StyledTableCell>
                <StyledTableCell align="right">{user.name}</StyledTableCell>
                <StyledTableCell align="right">{user.lastName}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.vacations.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.cart.length}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersList;

import {
  Grid,
  Typography,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "50px",
  },
  table: {
    marginTop: "20px",
  },
  dashboardSectionPaper: {
    p: 2,
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    "&:hover": { cursor: "grabbing" },
  },
}));

export default function PaperDashboard(props) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <React.Fragment>
      <Typography variant="h5" align="left">
        ALL PAPERS
      </Typography>
      <Box className={classes.table}>
        <Paper className={classes.dashboardSectionPaper}>
          <Table arial-label="something cool">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row) => (
                <TableRow
                  onClick={() => history.push("/lol")}
                  hover={true}
                  key={row.title}
                  className={classes.tableRow}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.authors}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

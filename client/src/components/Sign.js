import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_SIGN, QUERY_SIGN, QUERY_YUN } from "../gql/gql";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  Button: {
    backgroundColor: "#f50057",
    "&:disabled": {
      color: "#fff",
      backgroundColor: "#a4a4a4 !important",
      opacity: "0.9",
    },
  },
}));

const Sign = () => {
  const classes = useStyles();
  const [makeSign] = useMutation(MUTATION_SIGN);
  const [canSign, setCanSign] = useState(false);
  const {
    data: yunData,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);
  const {
    data: signData,
    loading: signRecord,
    refetch: signRefetch,
  } = useQuery(QUERY_SIGN);

  if (yunLoading || signRecord) {
    return <h1>Loading...</h1>;
  }
  const tomorrow1 = +yunData.yun.signAt + 24 * 3600;
  const tomorrow2 = Math.round(new Date().getTime() / 1000);
  const signClick = async () => {
    await makeSign();

    yunRefetch();
    signRefetch();
  };
  return (
    <>
      <Box width="100%" margin="20px 0">
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="secondary"
          disabled={tomorrow1 <= tomorrow2 ? false : true}
          onClick={signClick}
          className={classes.Button}
        >
          簽到
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ marginBottom: "4em" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">簽到日期</TableCell>
              <TableCell align="center">簽到時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {signData.signRecord?.map((record) => (
              <TableRow key={record.signAt}>
                <TableCell component="th" scope="row" align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                    meridians="1"
                    showTime="0"
                  >
                    {record.signAt}
                  </SimpleDateTime>
                </TableCell>
                <TableCell align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                    showDate="0"
                  >
                    {record.signAt}
                  </SimpleDateTime>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button onClick={se} size="large" variant="contained" fullWidth>
        Test
      </Button> */}
    </>
  );
};

export default Sign;

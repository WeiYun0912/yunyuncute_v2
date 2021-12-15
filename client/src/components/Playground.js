import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SimpleDateTime from "react-simple-timestamp-to-date";
import getReward from "../helper/getReward";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_PLAY_LOTTERY, QUERY_LOTTERY, QUERY_YUN } from "../gql/gql";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  Button: {
    backgroundColor: "#f50057",
    margin: "5px 0",
    "&:disabled": {
      color: "#fff",
      backgroundColor: "#dddddd !important",
      //   opacity: "0.5",
    },
  },
  textMargin: {
    margin: "20px 0",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Playground = () => {
  const classes = useStyles();
  const {
    data: lotteryRecord,
    loading: lotteryLoading,
    refetch: lotteryRefetch,
  } = useQuery(QUERY_LOTTERY);
  const {
    data: yunData,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);
  const [playLottery] = useMutation(MUTATION_PLAY_LOTTERY);

  if (lotteryLoading || yunLoading) {
    return <h1>Loading...</h1>;
  }

  const handlerClick = async () => {
    if (window.confirm("確定要抽獎嗎!")) {
      const rmn = Math.floor(Math.random() * 100);
      const reward = getReward(rmn);
      if (reward?.points) {
        await playLottery({
          variables: {
            input: {
              name: reward.name,
              points: reward.points,
            },
          },
        });
      } else {
        await playLottery({
          variables: {
            input: {
              name: reward.name,
            },
          },
        });
      }
      lotteryRefetch();
      yunRefetch();

      alert(`恭喜芸芸獲得了 ${reward.name}`);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h5" component="h5" className={classes.textMargin}>
          簽到五天以上可以抽獎哦!
        </Typography>
        <Typography variant="h5" component="h5" className={classes.textMargin}>
          芸芸目前簽到了 {yunData.yun.signDays} 天
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        color="secondary"
        className={classes.Button}
        onClick={handlerClick}
        disabled={yunData.yun.continuousSignDay >= 5 ? false : true}
      >
        抽獎!!!!
      </Button>

      <TableContainer component={Paper} style={{ marginBottom: "4em" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">抽獎時間</TableCell>
              <TableCell align="center">獎品</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lotteryRecord.lottery.map((record) => (
              <TableRow key={record.id}>
                <TableCell component="th" scope="row" align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                  >
                    {record.lotteryDate}
                  </SimpleDateTime>
                </TableCell>
                <TableCell align="center">{record.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Playground;

import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SimpleDateTime from "react-simple-timestamp-to-date";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_INVENTORY, MUTATION_UPDATED_INVENTORY } from "../gql/gql";

const Inventory = () => {
  const { data, loading, refetch } = useQuery(QUERY_INVENTORY);
  const [updatedInventory] = useMutation(MUTATION_UPDATED_INVENTORY);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const exchange = async (id, name) => {
    if (window.confirm("確定要兌換嘛!")) {
      await updatedInventory({
        variables: {
          input: {
            id,
            name,
          },
        },
      });

      refetch();

      alert("兌換成功!");
    }
  };

  return (
    <Box sx={{ marginBottom: "4em", width: "100%" }}>
      <TableContainer component={Paper} style={{ margin: "10px 0" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">取得時間</TableCell>
              <TableCell align="center">獎品</TableCell>
              <TableCell align="center">狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.inventory.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                    showTime="0"
                  >
                    {reward.exchangeDate}
                  </SimpleDateTime>
                </TableCell>
                <TableCell align="center">{reward.name}</TableCell>
                <TableCell align="center">
                  {!reward.isExchange ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => exchange(reward.id, reward.name)}
                    >
                      兌換
                    </Button>
                  ) : (
                    <Typography component="p">已兌換</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Inventory;

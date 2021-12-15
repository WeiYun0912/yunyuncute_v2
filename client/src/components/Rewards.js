import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_EXCHANGE_REWARD, QUERY_REWARDS, QUERY_YUN } from "../gql/gql";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useState } from "react";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 200,
    height: 200,
    objectFit: "cover",
    margin: "0 auto",
  },
}));

const Rewards = () => {
  const classes = useStyles();

  const {
    data: yun,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);
  const { data: rewards, loading: rewardLoading } = useQuery(QUERY_REWARDS);

  const [exchangeRewards] = useMutation(MUTATION_EXCHANGE_REWARD);

  if (yunLoading || rewardLoading) {
    return <h1>Loading...</h1>;
  }

  const exchangeReward = async (name, point) => {
    if (window.confirm("確定要兌換嘛!")) {
      await exchangeRewards({
        variables: {
          input: {
            name,
            point,
          },
        },
      });

      yunRefetch();

      alert("兌換成功!");
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" margin="20px 0">
        <Typography variant="h4">乖乖芸點數:{yun.yun.points}</Typography>
      </Box>
      <Box style={{ marginBottom: "4em" }}>
        {rewards.rewards
          .slice()
          .sort((a, b) => a.point - b.point)
          .map((reward) => (
            <Card
              className={classes.root}
              style={{ margin: "10px 15px" }}
              key={reward.id}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={reward.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {reward.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="span">
                    {reward.point} 點
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {reward.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={yun.yun.points >= reward.point ? false : true}
                  fullWidth
                  onClick={() => exchangeReward(reward.name, reward.point)}
                >
                  兌換
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Rewards;

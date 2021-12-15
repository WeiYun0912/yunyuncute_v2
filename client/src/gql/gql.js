import { gql } from "@apollo/client";

export const QUERY_YUN = gql`
  query Yun {
    yun {
      points
      signAt
      signDays
      continuousSignDay
    }
  }
`;

export const QUERY_REWARDS = gql`
  query Rewards {
    rewards {
      id
      name
      description
      image
      point
    }
  }
`;

export const QUERY_INVENTORY = gql`
  query Inventory {
    inventory {
      id
      name
      isExchange
      exchangeDate
    }
  }
`;

export const QUERY_LOTTERY = gql`
  query Query {
    lottery {
      id
      name
      lotteryDate
    }
  }
`;

export const QUERY_SIGN = gql`
  query Query {
    signRecord {
      signAt
    }
  }
`;

export const MUTATION_SIGN = gql`
  mutation Sign {
    sign {
      points
      signAt
      signDays
      continuousSignDay
    }
  }
`;

export const MUTATION_EXCHANGE_REWARD = gql`
  mutation ExchangeReward($input: changeRewardInput) {
    exchangeReward(input: $input) {
      id
      name
      isExchange
      exchangeDate
    }
  }
`;

export const MUTATION_UPDATED_INVENTORY = gql`
  mutation UpdatedInventory($input: updatedInventoryInput) {
    updatedInventory(input: $input) {
      name
      id
      isExchange
      exchangeDate
    }
  }
`;

export const MUTATION_PLAY_LOTTERY = gql`
  mutation PlayLottery($input: lotteryInput) {
    playLottery(input: $input) {
      id
      name
      lotteryDate
    }
  }
`;

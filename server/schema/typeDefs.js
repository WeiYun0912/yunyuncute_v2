const { gql } = require("apollo-server");

const typeDefs = gql`
  input changeRewardInput {
    name: String
    point: Int!
  }

  input lotteryInput {
    name: String!
    points: Int
  }

  input updatedInventoryInput {
    id: ID!
    name: String!
  }

  type Yun {
    points: Int!
    signAt: String!
    signDays: Int!
    continuousSignDay: Int!
  }

  type Sign {
    signAt: String!
  }

  type Reward {
    id: ID!
    name: String!
    description: String!
    image: String!
    point: Int!
  }

  type Inventory {
    id: ID!
    name: String!
    isExchange: Boolean!
    exchangeDate: String!
  }

  type Lottery {
    id: ID!
    name: String!
    lotteryDate: String!
  }

  type Query {
    yun: Yun
    rewards: [Reward!]!
    inventory: [Inventory!]!
    lottery: [Lottery!]!
    signRecord: [Sign!]!
  }

  type Mutation {
    sign: Yun
    exchangeReward(input: changeRewardInput): Inventory
    updatedInventory(input: updatedInventoryInput): Inventory
    playLottery(input: lotteryInput): Lottery
  }
`;

module.exports = typeDefs;

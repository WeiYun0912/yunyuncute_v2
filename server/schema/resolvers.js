const Yun = require("../models/Yun");
const Inventory = require("../models/Inventory");
const Rewards = require("../models/Rewards");
const Lottery = require("../models/Lottery");
const Sign = require("../models/Sign");

const resolvers = {
  Query: {
    yun: async () => {
      return await Yun.findOne({ id: "61b6415ed56d8ed45e2b3ef1" });
    },

    rewards: async () => {
      return await Rewards.find({});
    },

    inventory: async () => {
      return await Inventory.find({});
    },

    lottery: async () => {
      return await Lottery.find({});
    },
    signRecord: async () => {
      return await Sign.find({});
    },
  },
  Mutation: {
    sign: async () => {
      let yunData = await Yun.findOne({ id: "61b6415ed56d8ed45e2b3ef1" });

      let updateSign = {
        points: yunData.points + 2,
        signAt: Math.floor(Date.now() / 1000),
        signDays: yunData.signDays + 1,
        continuousSignDay: yunData.continuousSignDay + 1,
      };

      let sign = new Sign({
        signAt: Math.floor(Date.now() / 1000),
      });

      await sign.save();

      await Yun.updateOne(
        { _id: "61b6415ed56d8ed45e2b3ef1" },
        { $set: updateSign }
      );

      return await Yun.findOne({ id: "61b6415ed56d8ed45e2b3ef1" });
    },
    exchangeReward: async (_, args) => {
      const { name, point } = args.input;
      let yunData = await Yun.findOne({ id: "61b6415ed56d8ed45e2b3ef1" });

      let inventory = new Inventory({
        name,
        isExchange: false,
        exchangeDate: Math.floor(Date.now() / 1000),
      });

      await Yun.updateOne(
        { _id: "61b6415ed56d8ed45e2b3ef1" },
        { $set: { points: yunData.points - point } }
      );

      return await inventory.save();
    },

    updatedInventory: async (_, args) => {
      const { id, name } = args.input;
      console.log(name);
      if (name == "抽獎卷一張") {
        let yunData = await Yun.findOne({ id: "61b6415ed56d8ed45e2b3ef1" });
        await Yun.updateOne(
          { _id: "61b6415ed56d8ed45e2b3ef1" },
          { $set: { continuousSignDay: yunData.continuousSignDay + 5 } }
        );
      }

      await Inventory.updateOne(
        {
          _id: id,
        },
        { $set: { isExchange: true } }
      );

      return await Inventory.findOne({ id: id });
    },

    playLottery: async (_, args) => {
      const { name, points } = args.input;
      let yunData = await Yun.findOne({ id: "61b6415ed56d8ed45e2b3ef1" });
      if (points != null) {
        await Yun.updateOne(
          { _id: "61b6415ed56d8ed45e2b3ef1" },
          { $set: { points: yunData.points + points } }
        );
      } else {
        let inventory = new Inventory({
          name,
          isExchange: false,
          exchangeDate: Math.floor(Date.now() / 1000),
        });

        await inventory.save();
      }

      await Yun.updateOne(
        { _id: "61b6415ed56d8ed45e2b3ef1" },
        { $set: { continuousSignDay: yunData.continuousSignDay - 5 } }
      );

      let lottery = new Lottery({
        name,
        lotteryDate: Math.floor(Date.now() / 1000),
      });

      return await lottery.save();
    },
  },
};

module.exports = resolvers;

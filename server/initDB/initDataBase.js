const Motherboard = require("../model/Motherboard");
const Popular = require("../model/Popular");
const Processor = require("../model/Processor");
const User = require("../model/User");
const Videocard = require("../model/Videocard");

const MockMotherboards = require("../mock/Motherboards.json");
const MockPopulars = require("../mock/Populars.json");
const MockProcessors = require("../mock/Processors.json");
const MockUsers = require("../mock/Users.json");
const MockVideocards = require("../mock/Videocards.json");

module.exports = async () => {
  const serverMotherboards = await Motherboard.find();
  if (!serverMotherboards.length) {
    await initStartData(Motherboard, MockMotherboards);
  }
  const serverPopular = await Popular.find();
  if (!serverPopular.length) {
    await initStartData(Popular, MockPopulars);
  }
  const serverProcessors = await Processor.find();
  if (!serverProcessors.length) {
    await initStartData(Processor, MockProcessors);
  }
  const serverUsers = await User.find();
  if (!serverUsers.length) {
    await initStartData(User, MockUsers);
  }
  const serverVideocards = await Videocard.find();
  if (!serverVideocards.length) {
    await initStartData(Videocard, MockVideocards);
  }
};

async function initStartData(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}

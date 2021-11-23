require("../src/db/mongoose");
const User = require("../src/models/user");

// 61978d62cb5f49a3f90d1027

// User.findByIdAndUpdate("61978d62cb5f49a3f90d1027", { name: "Abdo" })
//   .then((user) => {
//     return User.countDocuments({ age: 0 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age: 0 });
  return count;
};

updateAgeAndCount("61979103a9495f6056445923", 1)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

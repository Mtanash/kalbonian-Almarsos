require("../src/db/mongoose");
const Task = require("../src/models/Task");

// 6196608c352aba482c17632c

// Task.findByIdAndDelete("6196608c352aba482c17632c")
//   .then((res) => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  return await Task.countDocuments({ completed: false });
};

deleteTaskAndCount("619c2b76ae5a8e0dbcb6677d")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

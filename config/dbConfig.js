// for production.........
module.exports = {
  HOST: "containers-us-west-71.railway.app",
  USER: "root",
  PASSWORD: "lcWiB4hWNFbxOVYnJLw8",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// // locallhost...........
// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "",
//   DB: "sepcms",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

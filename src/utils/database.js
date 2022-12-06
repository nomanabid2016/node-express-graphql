import mongoose from "mongoose";

(async () => {
  mongoose.connect("mongodb://localhost:27017/graphqlDb", () => {
    console.log("mongodb connection established");
  });
})();

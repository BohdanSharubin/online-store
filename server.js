const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.error(err));
});

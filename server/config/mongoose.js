const { connect } = require("mongoose");

const uri = process.env.DATABASE_URL || "mongodb+srv://evandraavin21:0AOI9cfKf2676jdV@cluster0.p0pwbkh.mongodb.net/digital?retryWrites=true&w=majority&appName=Cluster0/";

connect(uri, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
});

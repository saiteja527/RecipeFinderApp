const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true
})
    .then(() => {
        console.log("Database Connection Established Successfully");
    })
    .catch((err) => {
        console.error("Database Connection Failed", err);
    });

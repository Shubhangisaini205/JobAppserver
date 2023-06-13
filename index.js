const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { JobRouter } = require("./Routes/JobRoute");
const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("OK")
})

app.use("/job",JobRouter)

app.listen(8080, async() => {
    try {
        await connection;
        console.log("connected to the DB!!")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})
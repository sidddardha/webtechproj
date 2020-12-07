const express =require("express");
const mongoose =require("mongoose");
const cors =require("cors");
require("dotenv").config();

//set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT =process.env.PORT || 5000;

app.listen(PORT,() => console.log(`THE SERVER HAS STARTED ON PORT : ${PORT}`));

//set up mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> console.log('DB CONNECTED!'))
.catch(err => console.error(err));

//set up route
app.use("/users",require("./routes/userRouter"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
}

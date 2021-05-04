const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 const router = require('./routes/main.route');
const path = require('path');
const app = express();
const port = 8000;





app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// app.use('/main', router)


app.get('/', (req,res)=>{
    const user = 's';
    res.json(user);
})



//connect to db with mongoose
mongoose.connect(`mongodb+srv://admin:${process.env.key}@cluster.tbuyv.mongodb.net/main?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connect")
}).catch( (err)=> {
    console.log("database didnt connect" ,err)
});



if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    // const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
app.listen(process.env.PORT || port , () =>{
    console.log(`Server started on port ${process.env.PORT || port}`)
});

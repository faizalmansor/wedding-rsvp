const express = require('express');
// const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;


const fs = require('fs');

const router = express.Router();

router.post('/rsvp', (req, res) => {
    const item = req.body
    
    var safeName  = item.name
    var notSafeName = item.name
    if ((notSafeName.indexOf(',') > -1) || /\s/g.test(notSafeName)) { 
        safeName = '"' + notSafeName + '"' 
    }
    var data = "\n" + safeName + "," + parseInt(item.guest)

    fs.appendFile('rsvp.csv', data, 'utf8',
        function(err) {     
            if (err) throw err;
            console.log("Data is appended to file successfully.")
    });
    console.table(item)
    res.json(item)
    res.status(200).end()
});

// app.use(helmet());

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(router);

app.listen(port, function(){
  console.log('Running RSVP API on port ' + port);
});
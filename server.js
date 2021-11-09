var express = require('express');
const http = require('http');
const fs = require('fs');
var app = express();
const got = require('got');
const usl = require('./facebook-config')
const path = require('path');
app.use(express.json());


app.get("/facebook", async function (req, res) {

    const information = req.body;
    const quantity = information.quantity;
    const id = information.id;
    const token = information.token;

    const s =usl.URL1 + id + usl.URL2 + quantity + usl.URL3 +token ;
    const { body } = await got(s);
    const name  = JSON.parse(body).name;
    const ds = JSON.parse(body).posts.data;

    let str = '=='
    for(let i = 0;i<1000;i++){
        str = str + "=";
    }
    for(let i=0;i<ds.length;i++){
        fs.promises.mkdir(path.dirname("tmp/" +name+'.txt'), {recursive: true}).then(x => 
            fs.writeFile('tmp/'+ name+'.txt',"\n\n\n\nPost: "+ i +str+ "\n"+ ds[i].message+"\n", (err) => {
                if(err) {
                    console.log(err);
                }
            })
        )

        
    }
    console.log('The file has been saved!');
});



app.listen(3000);
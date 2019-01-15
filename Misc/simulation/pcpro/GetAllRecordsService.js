var MongoClient = require('mongodb').MongoClient;
const express=require('express')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var name;
app.post('/',(req,res)=>{
    var url = "mongodb://localhost:27017/";
     name=req.body.name;
    var myJSONObject = {'Name':name};
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Alexa");
  dbo.collection("users").find({"Name": myJSONObject.Name}).toArray(function(err, result) {
    if (err) throw err;
    for (var i in result)
    {
        if(result[i].Extension!=null)
        {
        console.log(result[i].Extension);
        if(result[i].Mobile_Number!=null)
        {
        console.log(result[i].Mobile_Number);
        }
        }
        else if(result[i].Mobile_Number!=null)
        {
        console.log(result[i].Mobile_Number);
        }
    }
    db.close();
    res.send({'Name':name,'Extension':result[i].Extension,"Mobile_Number":result[i].Mobile_Number});
  });

})
}) 
app.listen(2233,()=>{
    console.log("server started")
})
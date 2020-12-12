const express=require("express");
const app =express();
const https=require("https");
const bodyParser=require("body-parser");
require('dotenv').config();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));







app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
        
        
    });



    app.post("/",function(req,res){
        
        const email=req.body.email;
    
        const data={
            members:[
                {
                  email_address:email,
                  status:"subscribed"
                 
                }
            ]
        };
 const jsonData=JSON.stringify(data);
    const url=process.env.URL;

const options={
    method:"POST",
    auth:process.env.API_KEY
}

  const request=  https.request(url,options,function(response){
if(response.statusCode===200){
 res.sendFile(__dirname+"/success.html");
 
}
else{
    res.sendFile(__dirname+"/failure.html")
}


        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    
res.redirect("/");

});






    app.listen( process.env.PORT|| 3000,function(){
        console.log("runnig");
    });
    
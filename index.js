var express = require('express');
var request = require("request");
var app = express();

var bodyParser = require('body-parser');
var cors = require("cors");
var corsOptions = {
    origin : "*"
};

app.use( bodyParser.json() );
app.use(cors(corsOptions));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.json({message:"success"})
});

app.post('/signup', function(req, response) {
    var token = req.body.token;
    var resume = req.body.resume;

    request.get("https://my.mlh.io/api/v1/user?access_token="+token,function(err,res,body){
        var user = JSON.parse(body).data;


        request.post({
            url: "",
            headers:{
                "Authorization":"",
                "content-type": "application/json",
            },
            json:true,
            body:{
                email_address:user.email,
                status: "subscribed",
                merge_fields:{
                    FNAME:user.first_name,
                    LNAME:user.last_name,
                    MLH_ID:user.id,
                    SCHOOL:user.school.name,
                    RESUME:resume
                }
            }
        },function(error,mail_response,body){
            if (error){
                response.json({error:error});
                return;
            }

            response.json({data:body});
        });
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

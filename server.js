const express = require('express')
const Guid = require('guid')
const uuid = require('uuid');
const IO = require('./io-square-redis')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const pug = require('pug')
const Request  = require('request')
const Querystring  = require('querystring')
const app = express()

require('dotenv').config();

var csrf_guid = Guid.raw();
const api_version = 'v1.0';
const app_id = process.env.APP_ID;
const app_secret = process.env.APP_SECRET;
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.0/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.0/access_token';

IO.redis.setClient()
app.use(express.static('public'))
app.use(bodyParser.json())    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.set('views', './public/views')
app.set('view engine', 'pug')

app.use(session({
  genid: function(req) {
        return uuid() // use UUIDs for session IDs
    },
    store: new RedisStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.get('/',function(req,res){
  console.log(req.session.user_id)
  if(req.session.user_id) {
    res.render('index')
  }else{
    let sess = req.session
    let view = {
      appId: app_id,
      csrf: csrf_guid,
      version: 'v1.0',
    }
  res.render('login',{data:view.csrf});
  }
}
)

app.post('/home', function(request, response){
  // CSRF check
  if (request.body.csrf_nonce === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
    };

    // exchange tokens
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,
      };

        // get account details at /me endpoint
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        view.phone_num = request.body.mobile;

        IO.redis.hget('userlist',view.user_id)
        .then((data)=>{
          console.log(data)
          if(data === null) response.render('home',view)
          else{
          request.session.user_id = view.user_id
          response.redirect('/')
        }
        })
      });
  });
  }
  else {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
});

app.post('/updateprofile', (req,res)=>{
  req.session.user_id = req.body.user_id
  IO.redis.hmset(req.body.user_id,"id",req.body.user_id, "Mobile", req.body.phone_num,"fname",req.body.fname,"lname",req.body.lname,"email",req.body.email)
  .bind(()=>IO.redis.hmset('userlist',req.body.user_id,req.body.fname +" "+ req.body.lname))
  .then((reply,reply2)=>res.redirect('/'))
})

app.get('/getuserdata', (req, res)=> {
    IO.redis.hgetall('userlist').then((reply)=>{
      let data = []
      for (let val in reply){
        let obj = {
          id : val,
          name: reply[val]
        }
        data.push(obj)
      }
      res.send(data)
    })
})

app.get('/userdata',(req,res)=>{
  IO.redis.hgetall(req.session.user_id).then((reply)=>{
    res.send(reply)
  })
})
app.post('/formsubmit', (req, res)=>{
    const taskObject = {}
      taskObject.id = uuid.v4(),
      taskObject.title = req.body.task_name,
      taskObject.task_details = req.body.task_details,
      taskObject.date = req.body.date,
      taskObject.duedate = req.body.duedate,
      taskObject.taskby_id = req.session.user_id,
      taskObject.taskto_id = req.body.taskto_id,
      taskObject.status = "Not Completed"

    IO.redis.rpush(taskObject.taskby_id + '_taskout', JSON.stringify(taskObject)).then(res=>console.log(res))
    IO.redis.rpush(taskObject.taskby_id + '_taskin', JSON.stringify(taskObject)).then(res=>console.log(res))
  res.redirect('/')
})
app.get('/getdashboard',(req,res)=>{
  IO.redis.lrange(req.session.user_id+'_taskout',0,-1)
  .bind(()=>IO.redis.lrange(req.session.user_id+'_taskin',0,-1))
  .bind(()=>IO.redis.hgetall('userlist'))
  .then((reply,reply2,reply3)=>res.send({taskby:reply, taskto:reply2,userlist:reply3}))
})

app.get('/delete/:tasktoid/:id/:title/:task_details/:date/:duedate/:status',(req,res)=>{
  if(req.session.user_id){
    const taskObject = {}
      taskObject.id = req.params.id,
      taskObject.title = req.params.title,
      taskObject.task_details = req.params.task_details,
      taskObject.date = req.params.date,
      taskObject.duedate = req.params.duedate,
      taskObject.taskby_id = req.session.user_id,
      taskObject.taskto_id = req.body.tasktoid,
      taskObject.status = req.params.status

    IO.redis.lrem(req.session.user_id+"_taskout",1,taskObject)
    .bind(()=>IO.redis.lrem(req.params.tasktoid+"_taskin",1,taskObject))
    .then((reply,reply2)=>res.redirect('/'))
    }
  else{
    res.redirect('/')
  }
})
app.get('/logout',(req,res) => {
    req.session.destroy(err =>{
        if(err) console.log(err)
        else res.redirect('/')
    });
});

app.listen(3000,function(){
console.log('server running on 3000')})

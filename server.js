const express = require('express');
const hbs = require('hbs');
var app = express();

var fs=require('fs');

const port=process.env.PORT || 3000;

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}`;
  fs.appendFile('a.log',log);
next();

console.log(`{now} `);
});

// app.use((req,res,next)=>{
// res.render('maintainance.hbs');
// });


hbs.registerHelper('getCurrentYear', ()=>{
 return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(text)=> {
   return text.toUpperCase();
});
app.get('/',(req,res) => {
   // res.send("<marquee scrollamount='100' scrolldelay='60'><h1>Hello Punjab Express!!</h1></marquee>");
   res.render("home.hbs",{
     person:{name:"Prashanth",age:25},
     pageTitle:"Home Page",
     currentYear:new Date().getFullYear()
   });

});

app.get('/about',(req,res) => {
     res.render("about.hbs",{
       pageTitle:"About Page",
       currentYear:new Date().getFullYear()
     });
});

app.get('/bad',(req,res)=>{
   res.send({errorMessage:"unable to handle request"});
});
app.listen(port, () => {
 console.log(`server is up port ${port}`);
});

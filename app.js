const express = require("express"); // requiring that we have installed
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //to call the seperate module without installing it in the node


const app = express(); //  creating app constant by using the express


const items = ["Buy food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs'); // telling our app to use ejs

app.use(bodyParser.urlencoded({extended: true})); // told our app to use bodyparser
app.use(express.static("public"));


app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});




app.listen(3000, function() {
  console.log("server started on port 3000");

});

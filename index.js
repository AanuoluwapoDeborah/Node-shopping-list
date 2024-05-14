const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs")

let shoppingList = []

app.post("/", (req, res) => {
    const {name, price, quantity} = req.body;
    const subTotal = price * quantity;
    shoppingList.push({name, price, quantity, subTotal});
    res.redirect("/");
});

app.get("/", (req, res) => {
    const totalCost = shoppingList.reduce((total, item) => total + item.subTotal, 0);
    res.render("index", { shoppingList, totalCost });
});

app.post("/deleteList/:id", (req, res) => {
    let index = req.params.id;
    shoppingList.splice(index, 1);
    res.redirect("/");
});

app.post("/editList/:id", (req, res) => {
    const id = req.params.id;
    shoppingList.filter((list, index) => {
        if(index == id) {
            res.render("update", {list, id});
        }
    });
});

app.post("/updateList/:id", (req, res) => {
    const {name, price, quantity, subTotal} = req.body;
    let id = req.params.id;
    
    if(!name || !price || !quantity || !subTotal) {
        console.log("All fields required")
    }

    shoppingList.filter((list, index) => {
        if(index == id) {
            list.name = name;
            list.price = price;
            list.quantity = quantity;
            list.subTotal = subTotal;
        }
    })
    res.redirect("/");
})

app.listen(4000, () => {
    console.log("Server is running on port 4000")
});
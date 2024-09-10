const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd"
});


app.get("/", (req, res) => {
    const sql = "SELECT * FROM studentlist";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ error: err.message });
        } else {
            return res.json(data);
        }
    });
});

app.post("/create", (req, res) => {
    const firstname = req.body.firstname;
    const lastname=req.body.lastname;
    const location=req.body.location;
    const email = req.body.email;
    const date=req.body.date;
    const education=req.body.education;
    const about=req.body.about
    console.log(firstname,lastname,location,email,date,education,about);
    

    const sql = "INSERT INTO studentlist (firstname,lastname,location, email,date,education,about) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [firstname,lastname,location, email,date,education,about], (err, data) => {
        if (err) {
            return res.json({ message: err.message });
        } else {
            return res.json({ success: "Student added successfully", data: data,res:{firstname,lastname,email,location,education,about} });
        }
    });

});

app.get("/read/:id",(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM studentlist WHERE ID=?";
    db.query(sql,[id],(err,data)=>{
        if(err){
           return res.json({message:err.message})
        }else{
            return res.json({data,message:"successfully get the data"})
        }
        
    })
    
    
})

app.put("/edit/:id",(req,res)=>{
    
    const sql="UPDATE studentlist SET `firstname`=?,`lastname`=?,`location`=?,`email`=?,`date`=?,`education`=?,`about`=? WHERE ID=?";
    const id=req.params.id;
    console.log(req.body.firstname,req.body.lastname,req.body.location,req.body.email,req.body.date,req.body.education,req.body.about);
    
    db.query(sql,[req.body.firstname,req.body.lastname,req.body.location,req.body.email,req.body.date,req.body.education,req.body.about,id],(err,data)=>{
        if(err){
            return res.json({message:err.message})
        }else{
            return res.json({success:"updated successfully",data:data});
        }
    })
})
app.delete("/delete/:id",(req,res)=>{
    const sql="DELETE FROM studentlist WHERE ID=?";
    const id=req.params.id;
    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json({message:err.message})
        }else{
            return res.json({success:"deleted successfully",data:data});
        }
    })

})
app.listen(8088, () => {
    console.log("Server is running on port 8088");
});

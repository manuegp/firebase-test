const {Router} = require("express");
const router = Router();
const admin = require("firebase-admin")


const serviceAccount = require("../../curso-firebase-ef197-firebase-adminsdk-ej5pl-dc886b6d2c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://curso-firebase-ef197-default-rtdb.europe-west1.firebasedatabase.app'
})

const db = admin.database();

router.get("/", (req, res) =>{
    db.ref('contacts').once("value", (snapshot) =>{
        const data = snapshot.val();
        res.render("index", {contacts: data});
    })
})

router.post("/new-contact", (req, res) =>{
    console.log(req.body)
    const newContact ={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact, (()=>{
        console.log("Datos guardados")
    }))
    res.send("Recibido")
})

module.exports = router;
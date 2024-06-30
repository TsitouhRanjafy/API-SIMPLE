// Importation de express
import express, { Application , Request, Response} from "express";

// Creation d'un instance  d'application avec express    
const app : Application = express();
// definition du port du serveur
const port =process.env.PORT || 3000
// pour parser le json (convert to JSON)
app.use(express.json());
// app.use(express.urlencoded());

// __________________________ MIDDLEWARE START __________________________ //



// __________________________ MIDDLEWARE START __________________________ //

// gestion de route GET '/'
app.get('/',(req : Request, res : Response) => {
    res.send({"status": "ok"});
    console.log("start");
    
})
// gestion de route POST '/add'
app.post('/add',(req : Request, res : Response) => {
    const data = [];
    data.push(req.body)
    res.status(200).send(data);
})

// __________________________ GESTION DE ROUTE END __________________________ //


// __________________________ DEMARRAGE SERVEUR START __________________________ //

app.listen(port,() =>{
    console.log(`le serveur est demarrer sur le port \"\http://localhost:${port} "`)
})

// __________________________ DEMARRAGE SERVEUR END __________________________ //
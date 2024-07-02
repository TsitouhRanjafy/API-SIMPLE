// Importation de module express et l'niterface application 
import express, { Application , Request, Response, Router} from "express";
// Importation du module path pour la gestion du chemin
import path from 'path'
import Routes from "./routes";
import dotenv from "dotenv"
// Qui permet de securiser notre application express
import helmet from "helmet";
// Creation d'un instance  d'application avec express    
const app : Application = express();
// definition du port du serveur
dotenv.config();
const port = process.env.PORT || 3000


// __________________________ MIDDLEWARE START __________________________ //

// Midlleware qui permet de parser les JSON
app.use(express.json());
// pour securiser notre application express
app.use(helmet())
// __________________________ END__________________________ //

// __________________________ GESTION DE ROUTE START __________________________ //

// Creation d'instance de Route  qui gère le Route principal
const routes : Routes = new Routes(app)
routes.initialisation();

// __________________________ END __________________________ //


// __________________________ DEMARRAGE SERVEUR START __________________________ //

app.listen(port, async() =>{
    console.log(`le serveur est demarrer sur le port \"http://localhost:${port}\"`)
})

// __________________________ END __________________________ //
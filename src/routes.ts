// _______________________________ GESTION DE ROUTE START __________________________ //

// Importation des interfaces , Request , Response dans express
import { Application , Request, Response} from "express";
// Importation du donnée
import users from "./models/data/users.data";
// Importation du service utilisateur 
import { addUser, deleteUser, getUserbyId,getUsers,updateUser } from "./services/user.service";
import { removeById } from "./models/persistence/user.dao";

// Class qui gère le Route
class Routes {
    // Propriété
    private rout : Application

    constructor (app : Application){
        this.rout = app;
    }

    // méthode
    public initialisation(){
        // GET '/'
        this.rout.get('/',(req : Request,res : Response)=>{
            res.status(200).send({"status":"ok"}); // OK
        })
        // POST '/add'
        this.rout.post('/add',(req : Request,res : Response)=>{
            const data = req.body
            addUser(data);  
            res.status(201).send({"status" : "CREATED"}) // CREATED
        })
        // GET '/affiche'
        this.rout.get('/affiche',(req : Request,res : Response)=>{
            const data = req.body
            const id : number = data.id
            if (id === undefined ){
                res.status(204).send({"input id ":"not definie"}) // 
            }else{
                if (getUserbyId(id) === undefined){
                    res.status(404).send({"status":"not found"}) // NOT FOUND
                }else{
                    res.status(302).send(getUserbyId(id)) // FOUND
                }
            }
        })
        // GET '/affiches'
        this.rout.get('/affiches',(req : Request,res : Response)=>{
            let data = getUsers();
            res.status(200).send(JSON.stringify(data)) // OK
        })
        // POST '/supprimer'
        this.rout.get('/supprimer',(req : Request,res : Response)=>{
            let data = req.body
            const id : number = data.id
            res.status(200).send(deleteUser(id));
        })
        // POST '/mije à jour'
        this.rout.post('/update',(req: Request,res : Response) =>{
            let newDetails = req.body
            let id = newDetails.id
            updateUser(id,newDetails);
            res.send({"status":"en cours"})
        })
    }
}   

export default Routes

// _______________________________  GESTION DE ROUTE END  __________________________ //
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
            const {body : utilisateur} = req
            const ajoutUser = addUser(utilisateur);  
            return res.status(201).send({
                status : 201,
                message : ajoutUser
            }) // CREATED
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
        this.rout.put('/update/:id',(req: Request,res : Response) =>{
            let {body : newDetails} = req
            let id = parseInt(req.params.id)
            // pour la gestion id
            newDetails.id = id;
            const updated = updateUser(id,newDetails);

            if (!updated){ 
                return res.status(404).send({
                    status : 404,
                    message : `user ${id} not found`
                })
            }else{
                return res.status(302).send({
                    status : 302,
                    message : updated
                })
            }
            
        })
    }
}   

export default Routes

// _______________________________  GESTION DE ROUTE END  __________________________ //
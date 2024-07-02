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

    // Méthode
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
        this.rout.get('/affiche/:id',(req : Request,res : Response)=>{
            const id : number = parseInt(req.params.id,10) // 2 le id maximum
            const userGeted =  getUserbyId(id)
            if (userGeted === undefined){
                res.status(404).send({
                    status :"NOT FOUND",
                    message : userGeted

                }) // NOT FOUND
            }else{
                res.status(200).send({
                    status :"OK",
                    message : userGeted
                }) // FOUND
            }
        })

        // GET '/affiches'
        this.rout.get('/affiches',(req : Request,res : Response)=>{
            let data = getUsers();
            res.status(200).send(JSON.stringify(data)) // OK
        })

        // POST '/supprimer'
        this.rout.delete('/supprimer/:id',(req : Request,res : Response)=>{
            const id = parseInt(req.params.id,10);
            const user = getUserbyId(id)
            if (user){
                res.status(200).send({
                    status : "OK",
                    message : deleteUser(id)
                });
            } else {
                res.status(404).send({
                    status : "NO",
                    message : `User ${id} hasn't been deleted`
                });
            }
            
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
                    status : "NOT FOUND",
                    message : `user ${id} not found`
                }) 
            }else{
                return res.status(200).send({
                    status : "OK",
                    message : updated
                })
            }
            
        })
    }
}   

export default Routes

// _______________________________  GESTION DE ROUTE END  __________________________ //
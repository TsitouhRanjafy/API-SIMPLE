// _______________________________ GESTION DE ROUTE START __________________________ //

// Importation des interfaces , Request , Response dans express
import { Application , Request, Response} from "express";
// Importation du service utilisateur 
import { addUser, deleteUser, getUserbyId,getUsers,updateUser } from "./services/user.service";
// Importation de yup express middleware qui permet de valider les input qui vient de body
import { expressYupMiddleware} from "express-yup-middleware";
// Importation de user schema
import { addUserSchemaValidator,updateUserSchemaValidator } from "./user.schema.valid";
// Importation status code qui permet retourné d'un manière expère status code http
import {StatusCodes,ReasonPhrases} from 'http-status-codes'
import UpdateUserControllers from "./controllers/user.controllers";



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
            res.status(StatusCodes.OK).send({"status":"OK"}); // OK
        })

        // POST '/add'
        this.rout.post(
            '/add',
            // pour le schema validation
            expressYupMiddleware({
                schemaValidator: addUserSchemaValidator
                ,expectedStatusCode : StatusCodes.BAD_REQUEST
            }),
            (req : Request,res : Response)=>{
            const {body : utilisateur} = req
            const ajoutUser = addUser(utilisateur);  
            return res.status(StatusCodes.ACCEPTED).send({
                status : ReasonPhrases.ACCEPTED,
                message : ajoutUser
            }) 
        })

        // GET '/affiche'
        this.rout.get('/affiche/:id',(req : Request,res : Response)=>{
            const id : number = parseInt(req.params.id,10) // 2 le id maximum
            const userGeted =  getUserbyId(id)
            if (userGeted === undefined){
                res.status(StatusCodes.NOT_FOUND).send({
                    status : ReasonPhrases.NOT_FOUND,
                    message : userGeted

                })
            }else{
                res.status(StatusCodes.OK).send({
                    status :ReasonPhrases.OK,
                    message : userGeted
                })
            }
        })

        // GET '/affiches'
        this.rout.get('/affiches',(req : Request,res : Response)=>{
            let data = getUsers();
            res.status(StatusCodes.OK).send(JSON.stringify(data)) // OK
        })

        // POST '/supprimer'
        this.rout.delete('/supprimer/:id',(req : Request,res : Response)=>{
            const id = parseInt(req.params.id,10);
            const user = getUserbyId(id)
            if (user){
                res.status(StatusCodes.OK).send({
                    status : ReasonPhrases.OK,
                    message : deleteUser(id)
                });
            } else {
                res.status(StatusCodes.NOT_FOUND).send({
                    status : ReasonPhrases.NOT_FOUND,
                    message : `User ${id} hasn't been deleted`
                });
            }
            
        })

        // Gestion de rout '/update'
        const update : UpdateUserControllers = new UpdateUserControllers()
        this.rout.use('/update',update.getRouter())
    }
}   

export default Routes

// _______________________________  GESTION DE ROUTE END  __________________________ //
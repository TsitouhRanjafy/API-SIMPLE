import express,{ Request,Response, Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import { updateUserSchemaValidator,addUserSchemaValidator, afficheUserSchemaValidator } from "../user.schema.valid";
import { StatusCodes,ReasonPhrases } from "http-status-codes";
import { updateUser,getUserbyId,addUser,getUsers,deleteUser } from "../services/user.service";


export class UpdateUserControllers{
    // propriété
    private router : Router

    constructor(){
        this.router = express.Router();
        this.updateControllers();
    }

    private updateControllers(){
        // gestion de rout '/update/:id'
        this.router.put(
            '/:id',
            // pour le schema validation
            expressYupMiddleware({
                schemaValidator: updateUserSchemaValidator,
                expectedStatusCode : StatusCodes.BAD_REQUEST
            }),
            (req: Request,res : Response) =>{
            let {body : newDetails} = req
            let id = parseInt(req.params.id)
            // pour la gestion id
            newDetails.id = id;
            const updated = updateUser(id,newDetails);

            if (!updated){ 
                return res.status(StatusCodes.NOT_FOUND).send({
                    status : ReasonPhrases.NOT_FOUND,
                    message : `user ${id} not found`
                }) 
            }else{
                return res.status(StatusCodes.OK).send({
                    status : ReasonPhrases.OK,
                    message : updated
                })
            }
            
        })
    }

    public getRouter() : Router {
        return this.router
    }
}
export class AfficheUserControllers{
    // propriété
    private router : Router
    constructor(){
        this.router = express.Router();
        this.afficheControllers();
    }

    private afficheControllers(){
        // gestion de rout '/affiche/:id'
        this.router.get(
            '/:id',
            expressYupMiddleware({
                schemaValidator : afficheUserSchemaValidator,
                expectedStatusCode : StatusCodes.NOT_ACCEPTABLE
            }),
            (req : Request,res : Response)=>{
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
    }
    public getRouter() : Router {
        return this.router
    }
}
export class AffichesUserControllers{
    private router : Router
    constructor(){
        this.router = express.Router();
        this.affichesControllers();
    }
    private affichesControllers(){
        // Gestion de rout '/affiches/'
        this.router.get('/',(req : Request,res : Response)=>{
            let data = getUsers();
            res.status(StatusCodes.OK).send(data) // OK
        })
    }
    public getRouter() : Router {
        return this.router
    }
}

export class AddUserControllers{
    // propriété
    private router : Router
    constructor(){
        this.router = express.Router();
        this.addControllers();
    }

    private addControllers(){
        // Gestion de rout '/add/'
        this.router.post(
            '/',
            // schema qui permet de valider le body que l'on vient de reçeiver
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
    }
    public getRouter() : Router {
        return this.router
    }
}

export class DeleteUserControllers{
    private router : Router
    constructor(){
        this.router = express.Router();
        this.deleteControllers();
    }
    private deleteControllers(){
        // Gestion de rout '/delete/:id'
        this.router.delete('/:id',(req : Request,res : Response)=>{
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
    }
    public getRouter() : Router {
        return this.router
    }
}
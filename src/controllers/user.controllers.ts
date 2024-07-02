import express,{ Request,Response, Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import { updateUserSchemaValidator } from "../user.schema.valid";
import { StatusCodes,ReasonPhrases } from "http-status-codes";
import { updateUser } from "../services/user.service";

class UpdateUserControllers{
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
                schemaValidator: updateUserSchemaValidator
                ,expectedStatusCode : StatusCodes.BAD_REQUEST
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

export default UpdateUserControllers
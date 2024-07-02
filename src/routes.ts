// _______________________________ GESTION DE ROUTE START __________________________ //

// Importation des interfaces , Request , Response dans express
import { Application , Request, Response} from "express";
// Importation status code qui permet retourné d'un manière expère status code http
import {StatusCodes,ReasonPhrases} from 'http-status-codes'
import { 
    UpdateUserControllers ,
     AfficheUserControllers,
      AddUserControllers,
      AffichesUserControllers,
       DeleteUserControllers
} from "./controllers/user.controllers";



// Class qui gère le Route
class Routes {
    // Propriété
    private rout : Application

    constructor (app : Application){
        this.rout = app;
    }

    // Méthode
    public initialisation(){
        // Gestion de rout  '/'
        this.rout.get('/',(req : Request,res : Response)=>{
            res.status(StatusCodes.OK).send({"status":"OK"}); // OK
        })

        // Gestion de rout '/add'
       const add : AddUserControllers = new AddUserControllers()
       this.rout.use('/add',add.getRouter())

        // Gestion de rout '/affiche'
        const afficheOne : AfficheUserControllers = new AfficheUserControllers()
        this.rout.use('/affiche',afficheOne.getRouter());

        // Gestion de rout  '/affiches'
        const affiches : AffichesUserControllers = new AffichesUserControllers()
        this.rout.use('/affiches',affiches.getRouter())

        // Gestion de rout '/delete'
        const remove : DeleteUserControllers = new DeleteUserControllers
        this.rout.use('/delete',remove.getRouter())

        // Gestion de rout '/update'
        const update : UpdateUserControllers = new UpdateUserControllers()
        this.rout.use('/update',update.getRouter())
    }
}   

export default Routes

// _______________________________  GESTION DE ROUTE END  __________________________ //
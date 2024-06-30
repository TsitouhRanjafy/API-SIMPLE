// Importation du service modèl insertion
import  {insert,getOne,getAll} from "../models/persistence/user.dao"
// Importation du type utilisateur 
import UserI from "../models/persistence/user.models"

// Pour l'insertion d'utilisateur
export const addUser = (details : UserI) =>{
    insert(details);
}

// Pour avoire un utilisateur 
export const getUserbyId = (userID : number) =>{
    return getOne(userID)
}

export const getUsers = () =>{
    return getAll();
}


// Pour modification d'utilisateur
export const updateUser = (details : UserI) =>{
}

// Pour supprimer l'utilisateur
export const deleteUser = (details : UserI) =>{
}

//export default addUser

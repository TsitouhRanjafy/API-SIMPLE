// Importation du service modèl insertion
import  {insert,getOne,getAll,removeById, updateByNewUser} from "../models/persistence/user.dao"
// Importation du type utilisateur 
import UserI from "../models/persistence/user.models"

// Pour l'insertion d'utilisateur
export const addUser = (details : UserI) =>{
    return insert(details);
}
// Pour avoire un utilisateur 
export const getUserbyId = (userID : number) =>{
    return getOne(userID);
}
// Pour avoir tout l'utilisateur
export const getUsers = () =>{
    return getAll();
}
// Pour modification d'utilisateur
export const updateUser = (id:number,newDetails : UserI) =>{           
    updateByNewUser(id,newDetails);
}

// Pour supprimer l'utilisateur
export const deleteUser = (userID : number) =>{
    let result = removeById(userID);
    if (result === undefined){
        return ({"status":"not trouvé"});
    }
    return result;
}   










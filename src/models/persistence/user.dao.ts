// Importatoin de donnée utilisateur
import users from "../data/users.data";
// Importation d'interface utilisateur 
import UserI from "./user.models";
 
// fonction qui permet d'inserer un utilisateur
export const insert = (details : UserI ) : UserI  => {
    // pour l'incrementatin de l'ID
    const newUser = {...details,id : users.length + 1};
    // Inserer l'utilisateur
    users.push(newUser);
    return newUser
}
// fonction qui permet d'avoir un utilisateur
export const getOne = (id : number) : UserI | undefined  => {
    let result;
    users.forEach((objet,index) => {
        if (objet.id === id){
            // algorithme de recherche doit implementer ici
            result = users[index]
        }
    });
    return result
}
// fonction qui permet d'avoir tout l'utilisateur
export const getAll = () : UserI | Array<UserI> | undefined => {
    return users
}
// fonction qui permet de supprimer un utilisateur 
export const removeById = (userID : number) : Array<UserI> =>{
    let removed : any;
    users.forEach((user,index) => {
        if (user.id == userID){
            removed = users.splice(index,1);
        }
    });
    return removed
}
// fonction pour le mije à jours
export const updateByNewUser = (id : number,newDetails : UserI) =>{
    let userUpdated;
    // arrow function inside the map
    users.map((user,index) =>{
        if ((user.id == id) && (user != newDetails)){
            users[index] = newDetails
            userUpdated = users[index]
         }
    })
    return userUpdated
}
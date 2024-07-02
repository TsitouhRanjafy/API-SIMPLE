// importation de 'yup' pour la validation 
import * as Yup from 'yup'

const MINIMUM_LENGTH = {
    name: 4,
    city : 4
}

const MAXIMUM_LENGTH = {
    name : 20,
    city : 30
}

export const addUserSchemaValidator = {
    schema: {
        // validation pour le body qu'on vient de reçeiver depuis req.body
        body: {
            yupSchema: Yup.object().shape({
                name : Yup.string().min(MINIMUM_LENGTH.name).max(MAXIMUM_LENGTH.name).required(),
                email : Yup.string().email().required(),
                city : Yup.string().min(MINIMUM_LENGTH.city).max(MAXIMUM_LENGTH.city),
                genre : Yup.string().oneOf(["femele","male"]).required()    
            })
        }
      }
};

export const updateUserSchemaValidator = {
    schema: {
        // validation pour le body qu'on vient de reçeiver depuis req.body et le paramètre
        body: {
            yupSchema: Yup.object().shape({
                name : Yup.string().min(MINIMUM_LENGTH.name).max(MAXIMUM_LENGTH.name).required(),
                email : Yup.string().email().required(),
                city : Yup.string().min(MINIMUM_LENGTH.city).max(MAXIMUM_LENGTH.city),
                genre : Yup.string().oneOf(["femele","male"]).required()    
            })
        },
        params: {
            yupSchema: Yup.object().shape({
              id : Yup.number().integer().positive().required()
            })
        }
      }
}
export const afficheUserSchemaValidator = {
    schema: {
        // validation pour le paramètre id
        params: {
            yupSchema: Yup.object().shape({
              id : Yup.number().integer().positive().required()
            })
        }
      }
}


/*let userSchema = object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
});*/

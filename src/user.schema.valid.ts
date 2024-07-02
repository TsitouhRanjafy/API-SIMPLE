// importation de 'yup' pour la validation 
import * as Yup from 'yup'

export const addUserSchemaValidator = {
    schema: {
        // validation pour le body qu'on vient de reçeiver depuis req.body
        body: {
            yupSchema: Yup.object().shape({
                name : Yup.string().required(),
                email : Yup.string().email().required(),
                city : Yup.string(),
                genre : Yup.string().oneOf(["femele","male"]).required()    
            })
        }
      }
};

export const updateUserSchemaValidator = {
    schema: {
        // validation pour le body qu'on vient de reçeiver depuis req.body
        body: {
            yupSchema: Yup.object().shape({
                name : Yup.string().required(),
                email : Yup.string().email().required(),
                city : Yup.string(),
                genre : Yup.string().oneOf(["femele","male"]).required()    
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

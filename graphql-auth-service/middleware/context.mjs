import { AuthenticationError } from "apollo-server-errors";
import  jwt  from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.mjs";

export const context = async({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    if(!token){
      throw new AuthenticationError("Auhtentication required")
    }
    const user = jwt.verify(token, SECRET_KEY);

     if (!user) throw new AuthenticationError("Authenticaton required", {
       extensions: {
         code: 'UNAUTHENTICATED',
       },
     });
   
    // add the user to the contextValue
    return {
      user,
      }
    };
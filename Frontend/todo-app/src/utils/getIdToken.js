import { auth } from "../firebaseConfig";

const getIdToken = async ()=>{
    try {
        const id_token= await auth.currentUser.getIdToken(true);
        console.log(id_token);
        return id_token;
    } catch (error) {

        return null;
        
    }
}

export default getIdToken;
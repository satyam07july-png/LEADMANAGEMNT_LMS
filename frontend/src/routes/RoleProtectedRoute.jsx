import {
Navigate
} from "react-router-dom";

import {
useAuth
} from "../context/AuthContext";

const RoleProtectedRoute=({

children,

roles

})=>{

const{

user

}=useAuth();

if(!roles.includes(user.role)){

return<Navigate

to="/unauthorized"

/>

}

return children;

};

export default RoleProtectedRoute;
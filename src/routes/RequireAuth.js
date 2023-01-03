import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";


const RequireAuth = () => {

    const users = useSelector((state) => state.user)


    // users.token && users.user
    return (localStorage.getItem('user')) ? (
            <Outlet/>
        )
        :
        (
            <Navigate to="/login" replace/>
        );
};

export default RequireAuth;

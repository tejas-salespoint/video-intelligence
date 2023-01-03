import MinimalLayout from "layout/MinimalLayout/MinimalLayout";
import Auth from "../pages/Authentication/Auth/Auth";
import AuthRegister from "../pages/Authentication/Register/AuthRegister";
import LoginForm from "../pages/Authentication/Auth/LoginForm/LoginForm";
import RegisterForm from "../pages/Authentication/Auth/RegisterForm/RegisterFom";


// Authentication Routes

const AuthenticationRoutes = {
    path: "/",
    element : <MinimalLayout />,
    children : [
        {
            path : '/login',
            element : <LoginForm />
        },
        {
            path : '/register',
            element : <RegisterForm />
        }
    ]
}

export default AuthenticationRoutes;
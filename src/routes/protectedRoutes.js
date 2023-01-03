import useAuth from "../hooks/useAuth";
import {Navigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ME_USER} from "../graphql/userQuery";
import {useState} from "react";


export const ProtectedRoute = ({children}) => {


    const {auth} = useAuth();
    if (!auth) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

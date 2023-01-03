import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './_main.scss'
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

import {Provider} from "react-redux";
import store from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {setContext} from "@apollo/client/link/context";
//
// import {QueryClient} from "react-query";
// import {ReactQueryDevtools} from "react-query/devtools";
//
// const queryClient = new QueryClient()

const httpLink = createHttpLink({
    uri: 'http://localhost:1337/graphql',
})

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));


export const graphqlclient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

let persistor = persistStore(store)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ApolloProvider client={graphqlclient}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);



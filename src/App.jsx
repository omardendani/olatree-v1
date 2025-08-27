import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import { Component } from 'react';

class App extends Component {

    render() {
        return (
            <RouterProvider router={router} />
        )
    }
}

export default App

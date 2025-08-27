import { createBrowserRouter } from "react-router-dom";

// Layouts
    import NotFound from "../view/NotFound.jsx";

// Routes:
    import { generalRoutes } from "./generalRoutes.jsx";
    import { websiteRoutes } from "./websiteRoutes.jsx";
    
    // import { merchantRoutes } from "./merchantRoutes.jsx";


export const router = createBrowserRouter([

    // Routes générales
    ...generalRoutes,
    websiteRoutes,

    // Catch-all à la fin
    { 
        path: "*", 
        element: <NotFound /> 
    }

]);
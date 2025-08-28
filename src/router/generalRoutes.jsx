import { Suspense } from "react";
import BaserageLoader from "../utils/BaserageLoader.jsx";
import DefaultLayout from "../layouts/Baserage/DefaultLayout.jsx";
import GuestLayout from "../layouts/Baserage/GuestLayout.jsx";
import { loadComponent } from "../utils/dynamicImports.js";

const templateName = "default";

// Charger les composants dynamiquement
const LoginLayout = loadComponent(templateName, "layouts/LoginLayout");
const Home = loadComponent(templateName, "pages/Home");
const Login = loadComponent(templateName, "pages/Login");
const Signup = loadComponent(templateName, "pages/Signup");

export const generalRoutes = [
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <BaserageLoader templateName={templateName}>
                    <DefaultLayout/>
                </BaserageLoader>
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: Home ? <Home/> : <div>Home component not found</div>,
            },
            {
                path: "contact",
                element: <p>Contact</p>,
            },
        ],
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <BaserageLoader templateName={templateName}>
                    <GuestLayout>
                        {LoginLayout ? <LoginLayout/> : <div>LoginLayout not found</div>}
                    </GuestLayout>
                </BaserageLoader>
            </Suspense>
        ),
        children: [
            {
                path: "login",
                element: Login ? <Login /> : <div>Login component not found</div>,
            },
            {
                path: "signup",
                element: Signup ? <Signup /> : <div>Signup component not found</div>,
            },
        ],
    },
];
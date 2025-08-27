import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider.jsx';

export default function GuestLayout({ children }) {
  const { token } = useStateContext();
  const navigate = useNavigate();
    
    useEffect(() => {
        // Redirection si l'utilisateur n'est pas connecté
        if (token) {
            navigate("/user");
        }
    }, [token, navigate]);

  // Affichage du layout utilisateur avec ses enfants
  return <>{children}</>;
}

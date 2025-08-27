// src/contexts/PageResolver.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPageOwner } from '../utils/api.jsx';
import { useAuthUser } from '../hooks/useAuthUser.js';

export default function PageResolver({ children }) {
    const { pagename } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [pageOwner, setPageOwner] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const currentUser = useAuthUser();

    useEffect(() => {
        const resolve = async () => {
            const page = await fetchPageOwner(pagename);
            if (!page) {
                navigate('/');
                return;
            }

            setPageOwner(page);

            if (currentUser?.username === page.username) {
                console.log("✅ Vous êtes connecté sur votre propre page");
                setIsOwner(true);
            }

            setStatus('ready');
        };

        resolve();
    }, [pagename]);

    if (status === 'loading') return <div>Chargement...</div>;

    return children({ pageOwner, isOwner });
}

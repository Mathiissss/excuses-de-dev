import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 // Page 404/Page introuvable - Redirige automatiquement vers l'accueil après 5 secondes
 // return une page d'erreur avec un compte à rebours visuel


const LostPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="lost-container">
      <h1 className="lost-title">I'm Lost</h1>
      <img 
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWd5a2Y3MmlxMTA5dHNsMjR6a2F5ZnFzN2NidnN1aGthZnNneXljaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ji6zzUZwNIuLS/giphy.gif" 
        alt="Lost GIF" 
        className="lost-gif"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <div style={{display: 'none', fontSize: '10rem'}}>🤷‍♂️</div>
      <p style={{marginTop: '2rem', fontSize: '1.2rem'}}>
        Redirection vers l'accueil dans 5 secondes...
      </p>
    </div>
  );
};

export default LostPage;
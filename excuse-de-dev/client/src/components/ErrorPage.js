import React from 'react';
import { Link } from 'react-router-dom';

 // Composant ErrorPage - Page d'erreur 404 personnalisée
 // return le rendu de la page d'error 404

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-message">Page non trouvée</p>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="back-button">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default ErrorPage;
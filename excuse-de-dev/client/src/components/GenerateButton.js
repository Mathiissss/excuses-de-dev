import React from 'react';

 // Composant bouton pour générer une excuse aléatoire
 // {Object} props - Les propriétés du composant
 // {Function} props.onGenerate - Fonction appelée lors du clic sur le bouton
 // {boolean} props.isLoading - Indique si une excuse est en cours de génération
 // return un bouton interactif pour générer des excuses

const GenerateButton = ({ onGenerate, isLoading }) => {
  return (
    <button 
      className="generate-button"
      onClick={onGenerate}
      disabled={isLoading}
    >
      {isLoading ? 'Génération...' : 'Générer une excuse'}
    </button>
  );
};

export default GenerateButton;
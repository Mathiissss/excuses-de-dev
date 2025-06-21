import React, { useState } from 'react';

 // Composant Modal pour ajouter une nouvelle excuse de développeur
 // {Object} props - Les propriétés du composant
 // {Function} props.onAdd - Fonction appelée lors de la soumission du formulaire
 // {Function} props.onClose - Fonction appelée pour fermer le modal
 // return un modal interactif avec un formulaire d'ajouts d'excuses

const AddExcuseModal = ({ onAdd, onClose }) => {
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !tag.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    onAdd({
      message: message.trim(),
      tag: tag.trim()
    });

    setMessage('');
    setTag('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>Ajouter une nouvelle excuse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Catégorie (ex: Syntax Errors, Edge Cases...)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <textarea
            placeholder="Votre excuse de développeur..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="modal-buttons">
            <button 
              type="button" 
              className="modal-button secondary"
              onClick={onClose}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="modal-button primary"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExcuseModal;
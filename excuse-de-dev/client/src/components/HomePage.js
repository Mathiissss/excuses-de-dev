import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenerateButton from './GenerateButton';
import AddExcuseModal from './AddExcuseModal';

const HomePage = () => {
  const [currentExcuse, setCurrentExcuse] = useState(null);
  const [excuses, setExcuses] = useState([]);
  const [usedExcuses, setUsedExcuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    fetchExcuses();
    
    const titleTimer = setTimeout(() => {
      setTitleAnimated(true);
    }, 2000);

    return () => clearTimeout(titleTimer);
  }, []);

  const fetchExcuses = async () => {
    try {
      const response = await axios.get('/api/excuses');
      setExcuses(response.data.data || response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des excuses:', error);
    }
  };

  const generateRandomExcuse = () => {
    if (excuses.length === 0) return;

    if (usedExcuses.length >= excuses.length) {
      setUsedExcuses([]);
    }

    const availableExcuses = excuses.filter(
      excuse => !usedExcuses.includes(excuse.http_code)
    );

    if (availableExcuses.length === 0) {
      const randomIndex = Math.floor(Math.random() * excuses.length);
      const selectedExcuse = excuses[randomIndex];
      setCurrentExcuse(selectedExcuse);
      setUsedExcuses([selectedExcuse.http_code]);
    } else {
      const randomIndex = Math.floor(Math.random() * availableExcuses.length);
      const selectedExcuse = availableExcuses[randomIndex];
      setCurrentExcuse(selectedExcuse);
      setUsedExcuses([...usedExcuses, selectedExcuse.http_code]);
    }
  };

  const handleGenerateExcuse = () => {
    setIsLoading(true);
    
    const loadingTime = Math.random() * 4000 + 1000;
    
    setTimeout(() => {
      generateRandomExcuse();
      setIsLoading(false);
    }, loadingTime);
  };

  const handleAddExcuse = async (newExcuse) => {
    try {
      const response = await axios.post('/api/excuses', newExcuse);
      const createdExcuse = response.data.data || response.data;
      setExcuses([...excuses, createdExcuse]);
      setShowModal(false);
      alert('Excuse ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'excuse:', error);
      const errorMessage = error.response?.data?.error || 'Erreur lors de l\'ajout de l\'excuse';
      alert(errorMessage);
    }
  };

  return (
    <div className="home-container">
      <h1 className={`title ${titleAnimated ? 'animated' : ''}`}>
        Les Excuses de Dev
      </h1>
      
      <div className="excuse-display">
        {isLoading ? (
          <div className="loader"></div>
        ) : currentExcuse ? (
          <div>
            <div className="excuse-text">{currentExcuse.message}</div>
            <div className="excuse-code">Code HTTP: {currentExcuse.http_code} | {currentExcuse.tag}</div>
          </div>
        ) : (
          <div className="excuse-text">Cliquez sur le bouton pour générer une excuse !</div>
        )}
      </div>
      
      <div className="button-container">
        <GenerateButton 
          onGenerate={handleGenerateExcuse} 
          isLoading={isLoading}
        />
        <button 
          className="add-button"
          onClick={() => setShowModal(true)}
        >
          Ajouter une excuse
        </button>
      </div>

      {showModal && (
        <AddExcuseModal 
          onAdd={handleAddExcuse}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
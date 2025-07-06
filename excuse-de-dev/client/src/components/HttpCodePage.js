import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const HttpCodePage = () => {
  const { httpCode } = useParams();
  const [excuse, setExcuse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExcuse();
  }, [httpCode]);

  const fetchExcuse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/excuses/${httpCode}`);
      setExcuse(response.data.data || response.data);
      setError(false);
    } catch (err) {
      setError(true);
      setExcuse(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="http-code-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !excuse) {
    return (
      <div className="error-container">
        <h1 className="error-title">{httpCode}</h1>
        <p className="error-message">Code HTTP non trouvé</p>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          Ce code HTTP n'existe pas dans notre base d'excuses.
        </p>
        <Link to="/" className="back-button">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="http-code-container">
      <h1 className="http-code">{excuse.http_code}</h1>
      <p className="http-message">{excuse.message}</p>
      <p className="http-tag">{excuse.tag}</p>
      <Link to="/" className="back-button">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default HttpCodePage;
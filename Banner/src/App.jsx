import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './dashboard';

function App() {
  const [banner, setBanner] = useState({
    title: '',
    description: '',
    timer: 30,
    link: ''
  });
  const [showBanner, setShowBanner] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/banners/1') 
      .then(response => response.json())
      .then(data => {
        setBanner(data);
        setTimeLeft(data.timer);
        setShowBanner(data.visible);
      })
      .catch(error => console.error('Error fetching banner:', error));
  }, []);

  useEffect(() => {
    if (showBanner && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setShowBanner(false);
    }
  }, [showBanner, timeLeft]);

  return (
    <div className="container">
      <div className="btn-box">
        <button className='btn' onClick={() => setShowBanner(!showBanner)}>
          {showBanner ? 'Hide Banner' : 'Show Banner'}
        </button>
      </div>

      {showBanner && (
        <div className="banner">
          <h2 className='banner-title'>{banner.title}</h2>
          <p>{banner.description}</p>
          <a href={banner.link}>More Details</a>
          <p>{timeLeft} secs</p>
        </div>
      )}
      <Dashboard />
    </div>
  );
}

export default App;

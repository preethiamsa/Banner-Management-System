import { useState } from 'react';
import './dashboard.css'

function Dashboard() {
  const [banner, setBanner] = useState({
    title: '',
    description: '',
    timer: 30,
    link: '',
    visible: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBanner(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/banners/1', { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(banner)
    })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error('Error updating banner:', error));
  };

  return (
    <div className="dashboard">
      <h2>Banner Dashboard</h2>
      <form onSubmit={handleSubmit} className='banner-form'>
        <label>
          Title:
          <input type="text" name="title" value={banner.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={banner.description} onChange={handleChange} />
        </label>
        <label>
          Timer (seconds):
          <input type="number" name="timer" value={banner.timer} onChange={handleChange} />
        </label>
        <label>
          Link:
          <input type="text" name="link" value={banner.link} onChange={handleChange} />
        </label>
        <label>
          Visible:
          <input type="checkbox" name="visible" checked={banner.visible} onChange={handleChange} />
        </label>
        <button type="submit" className='btn'>Update Banner</button>
      </form>
    </div>
  );
}

export default Dashboard;

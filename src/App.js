import React, { useState, useEffect } from 'react';
import preloader from './img/flip.gif';

function App() {
  const [images, setImages] = useState([]);
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Загрузка списка изображений при монтировании компонента
    fetch(process.env.PUBLIC_URL + '/list.json')
      .then(response => response.json())
      .then(data => {
        setImages(data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []); // Пустой массив зависимостей для выполнения эффекта только один раз при монтировании

  const handleGetSignal = () => {
    setLoading(true);
    setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setLoading(false);
    setResult(images[randomIndex]);
    setImageUrl(images[randomIndex]);
  }, 1250); // 2 секунды
  };

  return (
    <div className="App">
      {loading ? (
        <div className="result">
        <img className="images" src={preloader} alt="Loading..." />
        <button className="coinflipstartloading">
        🔄 LOADING... 🔄
        </button>
        </div>   
      ) : (
        <>
          {result && (
            <div className='wrapper'> 
              <div className="result">
              {imageUrl && <img src={process.env.PUBLIC_URL + '/' + imageUrl} alt="Random" className='images'/>}
              </div> 
          </div>
          )}
          <button onClick={handleGetSignal} className="coinflipstart">
          🍀 GET SIGNAL 🍀
          </button>
        </>
      )}
    </div>
  );
}

export default App;

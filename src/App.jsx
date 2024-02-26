import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [images,setImages] = useState([])
  const [currentScore,setCurrentScore] = useState(0)
  const [bestScore,setBestScore] = useState(0)
  const [record,setRecord] = useState([])

  useEffect(() => {
    const temp =[]
    fetch('https://pixabay.com/api/?key=42506368-cdf67b7e4b080960df7a34bb3&q=tree',{mode:'cors'})
    .then(function(response) {
      return response.json()
    })
    .then(function (response) {
      console.log(response.hits)
      response.hits.forEach((image) => {
        temp.push({'url':image.largeImageURL,'id':image.id})
      })
      setImages(temp)
    })
  },[])
  
function shuffleImages(id) {
  if (record.includes(id)) {
      setBestScore((x) => x < currentScore ? currentScore : x)
      setCurrentScore(0)
      setRecord([])
    }
  else {
    setCurrentScore(currentScore+1)
    setRecord([...record,id])
  }
  let temp = [...images]  
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  setImages(temp)
}

  return (
    <div>
      <h3>Current Score: {currentScore} </h3>
      <h3>Best Score: {bestScore} </h3>
      {images.map((image) => {
        return <img src={image.url} onClick={() => shuffleImages(image.id)} key={image.id}></img>
      })}
    
    </div>
  )
}

export default App

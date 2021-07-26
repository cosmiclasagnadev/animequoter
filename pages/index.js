import Head from 'next/head'
import { useState } from "react";
const axios = require('axios').default;

const getRandomQuote = async () => {
  const data = await axios.get('https://animechan.vercel.app/api/random');
  // console.log(data.data);
  return data.data
}

var animeImageOptions  = {
  method: 'GET',
  url: 'https://bing-image-search1.p.rapidapi.com/images/search',
  params: {q: 'anime', count: '1'},
  headers: {
    'x-rapidapi-key': '67b335ab79mshc760d0fdd372facp1301e2jsn8d7acb97a43b',
    'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
  }
};

const getAnimeImage= async () => {
  const imageData = await axios.request(animeImageOptions)
  console.log(imageData.data.value[0].contentUrl)
  const imageDataUrl = imageData.data.value[0].contentUrl
  return imageDataUrl;

}



export default function Home() {
  const [animeQuote, setAnimeQuote] = useState('')
  const [imageUrl, setImageUrl] = useState('https://i.stack.imgur.com/y9DpT.jpg')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-800">
      <Head>
        <title>Anime Quoter 🍣</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-200 py-7">
          Anime Quoter
        </h1>
        <button onClick={async () => {
          const animeData = await getRandomQuote();
          // console.log(animeData)

          const { quote } = animeData;
          // console.log(quote)
          setAnimeQuote(quote)
          const dataUrl = await getAnimeImage();
          setImageUrl(dataUrl)
        }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate a Random Quote! 🍣
        </button>

        <div class="py-4">
          <img class="rounded-sm object-contain h-48 w-full" src={imageUrl}/>
        </div>
        <div>
          <p>{animeQuote}</p>
        </div>
        
      </main>
    </div>
  )
}

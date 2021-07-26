import Head from 'next/head'
import { useState } from "react";
const axios = require('axios').default;
import CircularProgress from '@material-ui/core/CircularProgress';

const getRandomQuote = async () => {
  const data = await axios.get('https://animechan.vercel.app/api/random');
  // console.log(data.data);
  return data.data
}

let animeImageOptions = {
  method: 'GET',
  url: 'https://bing-image-search1.p.rapidapi.com/images/search',
  params: { q: 'anime', count: '1' },
  headers: {
    'x-rapidapi-key': '67b335ab79mshc760d0fdd372facp1301e2jsn8d7acb97a43b',
    'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
  }
};

const getAnimeImage = async (query) => {
  animeImageOptions.params.q = query;
  const imageData = await axios.request(animeImageOptions)
  console.log(imageData.data.value[0].contentUrl)
  const imageDataUrl = imageData.data.value[0].contentUrl
  return imageDataUrl;

}



export default function Home() {
  const [animeQuote, setAnimeQuote] = useState('')

  const placeholderImage = 'https://i.stack.imgur.com/y9DpT.jpg'
  const [imageUrl, setImageUrl] = useState(placeholderImage);

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
          setImageUrl('')
          const animeData = await getRandomQuote();
          console.log(animeData)

          const { quote, character } = animeData;
          // console.log(quote)
          setAnimeQuote(quote)
          const dataUrl = await getAnimeImage(character);
          setImageUrl(dataUrl)
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate a Random Quote! 🍣
        </button>

        {(imageUrl === placeholderImage) || (imageUrl === '') ? <CircularProgress className='my-6' /> :
          <div className="my-6 py-4 flex bg-gray-900 px-4 rounded-md">
            <img className="rounded-sm object-cover h-48 w-48 py-4 px-4 rounded-full" src={imageUrl} />
            <p className="font-semibold text-xl text-white my-auto text-left py-4 px-4">{animeQuote}</p>
          </div>}


      </main>
    </div>
  )
}

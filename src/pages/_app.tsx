import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'


import Header from '../components/Header'

import { getTraduction, languages } from '@app/lib/Language'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  let language : string;

  const url = useRouter().pathname;

  if (url.startsWith("/pt"))
    language = "pt";
  else
    language = "en";


  const pages = [
    {
      name : getTraduction("about", language),
      link : `/${language == "en" ? "" : language + "/"}${getTraduction("about",language)}`
    }
  ]

  return (
    <div>
      <Header pages={pages} languages={languages} languageName={language}/>
      <Component {...pageProps} language={language} languages={languages}/>
    </div>
  )
}

import type { NextPage } from 'next'
import Head from 'next/head'
import { Root } from '../src/modules/root'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Modular React Eaxmple</title>
        <meta
          name="description"
          content="Special for https://dou.ua as an example for https://dou.ua/forums/topic/36547 topic"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center w-screen h-screen">
        <Root />
      </main>
    </>
  )
}

export default Home

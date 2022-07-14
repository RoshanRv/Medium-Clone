import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      {/*     Hero */}
      <section className='flex items-center justify-between px-6 bg-yellow-400 border-y-2 border-black py-12 lg:py-0' >
        <div className="flex flex-col gap-y-4">
          <h1 className='text-6xl font-serif max-w-2xl' ><span className='underline underline-offset-2 decoration-4' >Medium</span> is a place to write, read,and connect</h1>
          <p>It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
        </div>
        <div>
          <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" className='w-0 md:w-40 lg:w-full' />
        </div>
      </section>

    </div>
  )
}

export default Home

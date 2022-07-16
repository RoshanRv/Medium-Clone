import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import {sanityClient,urlFor} from '../sanity'

interface Props{

  posts:[Post]

}

interface Post{
  _id:string,
  body:[object],
  title:string,
  description:string,
  author:{
    image:string,
    name:string,
  },
  mainImage:{
    asset:{_ref:string}
  },
  slug:{
    current:string
  },

}

const Home = ({posts}:Props) => {


  return (
    <div className="max-w-screen-xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


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

      {/*     Posts  */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        {posts.map(post=>(
          <Link href={`/post/${post.slug.current}`} key={post._id}  >
            <div className='shadow-2xl mx-auto  p-2  rounded-lg'>
              <div className='overflow-hidden ' >
                <img src={urlFor(post.mainImage).url()!} className='hover:scale-105 transition-all '  />
              </div>
              {/*   title and des */}
              <div className="flex items-end gap-x-2 justify-between p-2">
                <div className="">
                  <h1 className='text-2xl font-semibold my-1' >{post.title}</h1>
                  <h1 className='text-sm  my-1 break-all' >{post.description} by {post.author.name}</h1>
                </div>
                {/* <div className='  rounded-full overflow-hidden ' > */}
                  <img src={urlFor(post.author.image).url()!} className='object-cover w-12 h-12  rounded-full' />
                {/* </div> */}
              </div>
        
            </div>
          </Link>
        ))}
      </section>

    </div>
  )
}

export default Home

export const getServerSideProps = async ()=>{

  const query =  `*[_type=='post']{
    _id,title,author ->{name,image},mainImage,slug,body,description
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props:{posts:posts}
  }

} 

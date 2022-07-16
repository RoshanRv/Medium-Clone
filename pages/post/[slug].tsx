import PortableText from 'react-portable-text'
import { sanityClient,urlFor } from '../../sanity'
import {useForm,SubmitHandler} from 'react-hook-form'
import { useState } from 'react'

interface Context{
    params:{
      slug:string
    }
}

interface InputForm{
  _id:string,
  name:string,
  email:string,
  comment:string,
  
}

interface Props{

  post:Post

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
  publishedAt:string,
  comments:Comment[]


}

interface Comment{
  name:string,
  approved:boolean,
  comment:string,
  email:string,
  _createdAt:string,
  _updatedAt:string,
  _id:string,
  _rev:string,
  _type:string,
  post:{
    _ref:string,
    _type:string
  }
}

const Post = ({post}:Props) => {

  const [isSubmitted,setIsSubmitted]=useState(false)

  const {register, handleSubmit, formState:{errors}}=useForm<InputForm>()

  const onSubmit:SubmitHandler<InputForm> = (data)=>{
    fetch(`/api/createComment`,{
      method:'POST',
      body:JSON.stringify(data)
    }).then(()=>{
      console.log(data)
      setIsSubmitted(true)
    }).catch((err)=>{
        console.log(err)
        setIsSubmitted(false)
    })
  }

  return (
    <main className='' >
      <img src={urlFor(post.mainImage).url()!} alt="" className='w-full h-60 object-cover object-center' />

      <article className='max-w-screen-xl mx-auto p-2 lg:px-10 ' >
        <h1 className="text-4xl my-4 font-semibold">{post.title}</h1>
        <p className="text-md my-1">{post.description}</p>
        <div className='flex items-center gap-x-4 text-gray-600 my-2 text-sm'>
          <img src={urlFor(post.author.image).url()!}  className='w-12 h-12 object-cover rounded-full' />
          <h1>Blog Posted By {post.author.name} - {new Date(post.publishedAt).toLocaleString()}</h1>
        </div>
        <hr className='border  mb-4' />
        <div>
          <PortableText
           dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} 
           projectId={process.env.NEXT_PUBLIC_SANTIY_PROJECT_ID} 
           content={post.body}
           className=''
           serializers={
             {
               h1:(props : any)=><h1 className='text-6xl my-3  font-bold ' {...props} />,
               h2:(props : any)=><h1 className='text-4xl my-3  font-semibold ' {...props} />,
               image:(props:any)=>{
                return ( <img src={props.asset.url} className='w-10/12 mx-auto border border-black rounded-md my-3 ' />)
            }
           }}
            />
        </div>
        {/*    */}
        <hr className='my-2 border border-yellow-400 w-3/4 mx-auto ' />
        {/*   comments */}
        {!isSubmitted?(<div className='mt-6'>
          <p className="text-yellow-500 text-lg my-2  text-semibold ">Enjoyed this article?</p>
          <h1 className="text-4xl font-bold">Leave a comment below!</h1>
          {/*     comments form */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col my-4 p-2  gap-y-4 text-lg text-gray-700'>
            {/* id */}
            <input {...register('_id')} type="hidden"  name='id' value={post._id} />
            <label className='block ' >
              <span className='block' >Name</span>
              <input {...register('name',{required:true})} type={'text'}   placeholder='Albert' className='p-2 outline-0 form-input border-b-2 border-yellow-400 block w-full focus:ring-2 ring-yellow-400 '/>
            </label>
            <label className='block ' >
              <span className='block' >Email</span>
              <input {...register('email',{required:true})} type={'email'}  placeholder='albert@gmail.com' className='p-2 outline-0 form-input border-b-2 border-yellow-400 block w-full focus:ring-2 ring-yellow-400 '/>
            </label>
            <label className='block' >
              <span className='block' >Comment</span>
              <textarea   placeholder="Hey, It's Awesome!!" className='p-2 outline-0 form-input border-b-2 border-yellow-400 block w-full focus:ring-2 ring-yellow-400 ' rows={4} cols={60}  {...register('comment',{required:true})} />
            </label>
            {/*     errors */}
            <div>
              {errors.name&& (
                <h1 className='text-red-600 my-1'>-- Name Field Is Required</h1>
              )}
              {errors.email&& (
                <h1 className='text-red-600 my-1'>-- Email Field Is Required</h1>
              )}
              {errors.comment&& (
                <h1 className='text-red-600 my-1'>-- Comment Field Is Required</h1>
              )}
            </div>
            {/*     submit btn */}
            <input type="submit" value="Comment" className='block w-full p-2 bg-yellow-400 cursor-pointer hover:bg-yellow-500 transition-all rounded-lg my-2 text-white' />
          </form>
        </div>):(
        <div className='bg-yellow-400 p-2 py-8 text-center '>
          <h1 className="text-3xl font-bold text-white my-1">Your Comment Has Been Submitted</h1>
          <h1 className="text-sm font-semibold text-white my-1">Refresh the page to load your comment</h1>
        </div>)}
          {/*     exisiting commands */}
          <div className="my-6 ">
            <h1 className="text-4xl font-bold">Comments</h1>
            <div className="bg-white shadow-md shadow-yellow-400 p-6 flex flex-col gap-y-6 my-2 rounded-md">
            {post.comments.length>0?(
              post.comments.map(comment=>(<h1 key={comment._id} ><span className='text-lg text-yellow-500 font-semibold' >{comment.name}</span> : <span>{comment.comment}</span></h1>))):(
                <h1 className='text-4xl m-4 font-bold'>No Comments</h1>
              )}
            </div>
          </div>
      </article>
    </main>
  )
}

export default Post




//    Static Paths

export const getStaticPaths = async ()=>{

    const query = `*[_type=='post']{
        _id,slug}`

    const posts = await sanityClient.fetch(query)

    const paths = posts.map((post:Post)=>({
        params:{
            slug:post.slug.current
        }
    }))


    return {
        paths,
        fallback:'blocking'
    }

}

//      Static Props

export const getStaticProps = async ({params}:Context)=>{

    const query = `*[_type=='post' && slug.current == $slug][0]{
      _id,title,author ->{name,image},
      body[]{
        ..., 
        asset->{
          ...,
          "_key": _id
        }},slug,mainImage,description, publishedAt
    ,'comments':*[_type=='comment' && post._ref== ^._id ]}`

    const post = await sanityClient.fetch( query,{slug:params?.slug})

    if(!post){
      return{
        notFound:true
      }
    }

    return {
      props:{
        post
      },
      revalidate:60
    }

}
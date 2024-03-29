import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import PostCard from '../components/PostCard';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const status = useSelector((state) => state.auth.status);
    
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                       { !status &&  <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            
                               <Link to="login"><button>Login</button></Link>
                            
                            
                        </div>}

                        {
                             status && <h1 className="text-2xl font-bold hover:text-gray-500">
                             Click on All posts to view all the posts
                         </h1>
                        }
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
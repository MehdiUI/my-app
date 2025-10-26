import React from 'react'
import { Button } from '../components/ui/button'
import Container from '../components/Container'
import HomeBanner from '../components/HomeBanner'



const Home = () => {
  return (
    <Container className=' bg-shop-light-pink'><h2 className='text-xl font-semibold'></h2>
   <HomeBanner />
    </Container>
  )
}

export default Home
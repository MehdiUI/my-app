import React from 'react'
import { Button } from '../components/ui/button'
import Container from '../components/Container'



const Home = () => {
  return (
    <Container className=' bg-shop-light-pink'><h2 className='text-xl font-semibold'>Home</h2>
    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, 
      odio quibusdam numquam voluptates, veniam architecto alias voluptate itaque quia illo debitis saepe dolor 
      exercitationem sunt, minus laboriosam minima repudiandae velit.</p>
      <Button size="lg">Click Me</Button>
    </Container>
  )
}

export default Home
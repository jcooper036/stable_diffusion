import { ChakraProvider, Container, Input, Heading, Wrap, Button, Image, Text, Link, Stack, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { saveAs } from 'file-saver'

function App() {
  const [image, updateImage] = useState()
  const [prompt, updatePrompt] = useState()
  const [loading, updateLoading] = useState()

  const downloadImage = () => {
    saveAs(`data:image/png;base64,${image}`, prompt)
  }

  const generate = async prompt => {
    updateLoading(true)
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`)
    updateImage(result.data)
    updateLoading(false)
  }
  return (
    <ChakraProvider>
      <Container>
        <Heading>Stable Diffusion 🚀</Heading>
        <Text marginBottom={"10px"}>This react app leverages the model trained by Stability AI and Runway ML to generate images using the Stable Diffusion model. The model can be found via <Link href={"https://github.com/CompVis/stable-diffusion"}>GitHub here</Link></Text>
        <Wrap>
          <Input value={prompt} onChange={e => updatePrompt(e.target.value)} width={"350px"}></Input>
          <Button onClick={e => generate(prompt)} colorScheme={"yellow"}> Generate</Button>

        </Wrap>
        {loading ?
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack> :
          image ? <Image src={`data:image/png;base64,${image}`} boxShadow="lg" alt={prompt} /> : null}
        <Wrap>
          <Button onClick={e => downloadImage()}>Download!</Button>
        </Wrap>
      </Container>
    </ChakraProvider>
  );
}

export default App;

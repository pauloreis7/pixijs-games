import { useRef, useState } from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { GAME_VIEW_CONTAINER_ID } from './utils/constants'
import { Game } from './game'

export default function App() {
  const gameRef = useRef<Game>({} as Game)
  const [gameStarted, setGameStarted] = useState(false)

  function startMatch() {
    gameRef.current = new Game()

    gameRef.current.start()

    setGameStarted(true)
  }

  return (
    <Flex as="main" w="100vw" h="100%" flexDirection="column">
      <Flex
        h="100%"
        minHeight="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py="14"
        maxWidth="64rem"
        mx="auto"
        px={['4', '6']}
      >
        <Heading
          as="h1"
          mb="6"
          textAlign="center"
          fontSize={['3xl', '4xl', '5xl']}
          textTransform="capitalize"
          color="pink.500"
        >
          pixiJS mini-games
        </Heading>

        {!gameStarted && (
          <Button
            colorScheme="pink"
            mb="8"
            size={['md', 'lg']}
            onClick={startMatch}
          >
            Play Now
          </Button>
        )}

        <Box id={GAME_VIEW_CONTAINER_ID} />
      </Flex>
    </Flex>
  )
}

import { useMemo } from 'react'
import { Box, Button, Link as ChakraLink, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { signIn, signOut, useSession } from 'next-auth/client'

import { useApollo } from '../lib/apolloClient'

import { Container } from './Container'

type Route = {
  text: string
  route: string
}

export const CTA: React.FC = () => {
  const apolloClient = useApollo()
  const [session, loading] = useSession()
  const router = useRouter()

  const renderAuthButton = () => {
    const buttonText = session ? 'Sign Out' : 'Sign In'

    const signOutAndClearData = async () => {
      await signOut()
      await apolloClient.clearStore()
    }

    return (
      <Box flexGrow={3} mx={2}>
        <Button
          width="100%"
          variant="solid"
          colorScheme="green"
          onClick={() => (session ? signOutAndClearData() : signIn())}>
          {loading ? <Spinner /> : buttonText}
        </Button>
      </Box>
    )
  }

  const buttonRoute: Route = useMemo<Route>(() => {
    if (router.route === '/') return { route: '/launches', text: 'Launches' }
    return { route: '/', text: 'Home' }
  }, [router.route])

  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="0"
      width="100%"
      maxWidth="48rem"
      py={2}>
      {renderAuthButton()}
      <ChakraLink href={buttonRoute.route} flexGrow={1} mx={2}>
        <Button width="100%" variant="outline" colorScheme="green">
          {buttonRoute.text}
        </Button>
      </ChakraLink>
    </Container>
  )
}

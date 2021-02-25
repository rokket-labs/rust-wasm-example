import { FC, useEffect } from 'react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Code,
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/client'

import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Main } from '../components/Main'

type ComponentProps = {
  greet: (text: string) => void
}
const Component: FC<ComponentProps> = ({ greet }) => {
  useEffect(() => {
    greet('hello from rrrrrrrust')
  }, [greet])
  return <div>gg</div>
}

const RustComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    const rustModule = await import('../wasm/pkg/wasm')
    // Return a React component that calls the add_one method on the wasm module
    return () => <Component greet={rustModule.greet} />
  },
})

const Index: NextPage = () => {
  const [session] = useSession()

  const renderFooter = () => {
    if (!session) return <Text>Not logged in</Text>

    const { image, name, email } = session.user

    return (
      <VStack>
        {image && <Avatar src={image} />}
        <Text>
          Logged in as <Code>{name}</Code> - (<Code>{email}</Code>)
        </Text>
      </VStack>
    )
  }

  return (
    <>
      <Hero />
      <Main>
        <RustComponent />
        <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
          <Code>typescript</Code>.
        </Text>

        <List spacing={3} my={0}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://chakra-ui.com"
              flexGrow={1}
              mr={2}>
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://nextjs.org"
              flexGrow={1}
              mr={2}>
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://www.apollographql.com/"
              flexGrow={1}
              mr={2}>
              Apollo GraphQL <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://next-auth.js.org/"
              flexGrow={1}
              mr={2}>
              NextAuth <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List>
      </Main>
      <Footer>{renderFooter()}</Footer>
    </>
  )
}

export default Index

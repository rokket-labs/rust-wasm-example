import { ChangeEvent, FC, useState } from 'react'
import { Code, Flex, Heading, Spacer, Text, Textarea } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

type ComponentProps = {
  language: string
}
const Component: FC<ComponentProps> = ({ language }) => {
  return <div>Language: {language} 🚀🎉</div>
}

const RustComponent = dynamic<{ text: string }>({
  loader: async () => {
    // Import the wasm module
    const rustModule = await import('../wasm/pkg/wasm')
    // Return a React component that calls the add_one method on the wasm module
    return ({ text = '' }) => (
      <Component language={rustModule.summarization(text)} />
    )
  },
})

const Index: NextPage = () => {
  const [value, setValue] = useState(
    'Ĉu vi ne volas eklerni Esperanton? Bonvolu! Estas unu de la plej bonaj aferoj!',
  )

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh">
      <Heading fontSize="6vw" marginBottom="10">
        {'Rust language detector 🔥'}
      </Heading>
      <Text marginBottom="3">
        Example repository of <Code>Next.js</Code> + <Code>WebAssembly</Code> +{' '}
        <Code>Rust</Code> + <Code>Typescript</Code>.
      </Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Here is a sample placeholder"
      />
      <RustComponent text={value} />
    </Flex>
  )
}

export default Index

import { AnimateSharedLayout } from 'framer-motion'

import { Container } from './Container'
import { DarkModeSwitch } from './DarkModeSwitch'

export const Layout: React.FC = ({ children }) => {
  return (
    <AnimateSharedLayout>
      <Container height="100vh">
        {children}
        <DarkModeSwitch />
      </Container>
    </AnimateSharedLayout>
  )
}

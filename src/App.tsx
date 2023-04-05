import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  extendTheme
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Cube from "./component/Cube"


// 2. declare your configuration, these are the defaults
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}
// 3. extend the theme
const customTheme = extendTheme({ config })

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Cube />
      </Grid>
    </Box>
  </ChakraProvider>
)

import { ChakraProvider, Flex } from '@chakra-ui/react'

import Chart from './Chart';

function App() {
    return (
        <ChakraProvider>
            <Flex height="85%" width="95%" flexDir="column">
                <Chart />
            </Flex>
        </ChakraProvider>
    );
}

export default App;

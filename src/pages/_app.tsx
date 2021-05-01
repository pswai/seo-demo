import { Box, ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DefaultSeo titleTemplate="SEO Demo | %s" />

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

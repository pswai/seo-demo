import React from "react";
import { NextSeo, ProductJsonLd, ProductJsonLdProps } from "next-seo";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";

enum Availability {
  InStock = "IN_STOCK",
  Limited = "LIMITED",
  OutOfStock = "OUT_OF_STOCK",
}

const AvailabilityScheme = {
  [Availability.InStock]: "https://schema.org/InStock",
  [Availability.Limited]: "https://schema.org/LimitedAvailability",
  [Availability.OutOfStock]: "https://schema.org/OutOfStock",
};

function toPrice(currency: string, price: number) {
  return `${currency} ${price.toFixed(2)}`;
}

const product = {
  id: "123",
  name: "Grade AAA Apricots",
  description:
    "The highest grade apricots harvested carefully in the morning when it is still covered by mist.",
  images: {
    small: "photos/apricots-small.jpeg",
    full: "photos/apricots.jpeg",
  },
  seller: "SEO Fresh",
  variants: [
    {
      id: "v1",
      name: "S",
      price: 70.0,
      availability: Availability.OutOfStock,
    },
    {
      id: "v2",
      name: "M",
      price: 100.0,
      availability: Availability.InStock,
    },
    {
      id: "v3",
      name: "L",
      price: 150.0,
      availability: Availability.Limited,
    },
  ],
};

// Image source: https://search.creativecommons.org/photos/adc798fd-d60e-4334-be01-47b57c33e4fd
const productJsonldProps: ProductJsonLdProps = {
  productName: product.name,
  description: product.description,
  images: Object.values(product.images),
  brand: product.seller,
  offers: product.variants.map((variant) => ({
    price: variant.price.toFixed(2),
    priceCurrency: "USD",
    availability: AvailabilityScheme[variant.availability],
    seller: {
      name: product.seller,
    },
  })),
};

function SingleProductPage() {
  const { name, description, variants, images } = product;

  const allPrices = variants.map((variant) => variant.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return (
    <>
      <NextSeo title={name} description={description} />
      <ProductJsonLd {...productJsonldProps} />

      <Flex
        // columns={[1, null, 2]}
        flexDirection={["column", null, "row"]}
        maxWidth={[null, null, "960px"]}
        mx={[null, null, "auto"]}
      >
        <Box flex={[null, null, 1]} p={[null, null, 4]}>
          <AspectRatio ratio={4 / 3}>
            <Image src={images.small} alt={name} />
          </AspectRatio>
        </Box>

        <Stack spacing={4} p={4} flex={[null, null, 2]}>
          <Box>
            <Heading as="h1" size="lg">
              {name}
            </Heading>
            {toPrice("USD", minPrice)} - {toPrice("USD", maxPrice)}
          </Box>

          <Box>{description}</Box>

          <Stack direction="row" spacing={4}>
            {variants.map((variant) => (
              <Button
                key={variant.id}
                type="button"
                variant="outline"
                disabled={variant.availability === Availability.OutOfStock}
              >
                {variant.name}
              </Button>
            ))}
          </Stack>

          <Box>
            <Button type="button" isFullWidth>
              Add To Cart
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default SingleProductPage;

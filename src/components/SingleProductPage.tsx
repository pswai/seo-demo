import React from "react";
import { NextSeo, ProductJsonLd, ProductJsonLdProps } from "next-seo";
import {
  AspectRatio,
  Box,
  Button,
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
  imageUrl: "photos/apricots-small.jpeg",
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
  const { name, description, variants, imageUrl } = product;

  const allPrices = variants.map((variant) => variant.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return (
    <>
      <NextSeo title={name} description={description} />
      <ProductJsonLd {...productJsonldProps} />

      <AspectRatio ratio={4 / 3}>
        <Image src={imageUrl} alt={name} />
      </AspectRatio>

      <Stack spacing={4} p={4}>
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
    </>
  );
}

export default SingleProductPage;

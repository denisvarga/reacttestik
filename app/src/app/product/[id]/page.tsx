'use client'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface Params {
  params: {
    id: string;
  };
}

const handleBuy = () => {
    alert('Toto by si asi vela chcel odomna');
  };

const ProductDetail: React.FC<Params> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          setError('Error fetching the product');
          console.error('Error fetching the product', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container maxWidth="xl">
        <Box
        my={4}
      display="flex"
      alignItems="center"
      gap={4}
          p={2}
          bgcolor='#fff'
          >
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <img src={product.images[0]} alt={product.title} style={{ height: 500, objectFit: 'contain' }} />
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom color="black" variant="h4">{product.title}</Typography>
            <Typography gutterBottom color="black" variant="h6">{product.price} €</Typography>
              <Typography gutterBottom color="black" variant="body1">{product.description}</Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => router.back()}>naspäť</Button>                
                <Button variant="contained" onClick={handleBuy}>
                  Kúpiť
                </Button>
              </Stack>
          </Grid>
          </Grid>
          </Box>
      </Container>
    </div>
  );
};

export default ProductDetail;

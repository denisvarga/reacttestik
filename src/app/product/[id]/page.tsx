'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Product } from '../../../types/product';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

const handleBuy = () => {
  alert('Toto by si asi vela chcel odomna');
};

const ProductDetail = () => {
  const { id } = useParams();

  const [pageState, setPageState] = useState<{
    product: Product | null;
    error: string | null;
    loading: boolean;
  }>({
    product: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(
            `https://dummyjson.com/products/${id}`
          );
          setPageState({
            product: response.data,
            error: null,
            loading: false,
          });
        } catch (error) {
          setPageState({
            product: null,
            error: 'Failed to fetch product',
            loading: false,
          });
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (pageState.loading) {
    return <div>Loading...</div>;
  }

  if (pageState.error) {
    return <div>{pageState.error}</div>;
  }
  if (pageState.product) {
    return (
      <div>
        <Container maxWidth='xl'>
          <Box
            my={4}
            display='flex'
            alignItems='center'
            gap={4}
            p={2}
            bgcolor='#fff'
          >
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <img
                  src={pageState.product.images[0]}
                  alt={pageState.product.title}
                  style={{ height: 500, objectFit: 'contain' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom color='black' variant='h4'>
                  {pageState.product.title}
                </Typography>
                <Typography gutterBottom color='black' variant='h6'>
                  {pageState.product.price} €
                </Typography>
                <Typography gutterBottom color='black' variant='body1'>
                  {pageState.product.description}
                </Typography>
                <Stack direction='row' spacing={2}>
                  <Button variant='contained' href='/'>
                    naspäť
                  </Button>
                  <Button variant='contained' onClick={handleBuy}>
                    Kúpiť
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }

  return null;
};

export default ProductDetail;

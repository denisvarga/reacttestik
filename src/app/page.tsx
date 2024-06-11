'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import Container from '@mui/material/Container';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const ProductList: React.FC = () => {
  const [pageState, setPageState] = useState<{
    loading: boolean;
    products: Product[];
    error: string | null;
  }>({
    loading: true,
    products: [],
    error: null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>(
          'https://dummyjson.com/products'
        );

        if (Array.isArray(response.data.products)) {
          setPageState({
            loading: false,
            products: response.data.products,
            error: null,
          });
        } else {
          setPageState({
            loading: false,
            products: [],
            error: 'Fetched data is not an array',
          });
        }
      } catch (error) {
        setPageState({
          loading: false,
          products: [],
          error: 'Error fetching the products',
        });
      }
    };

    fetchProducts();
  }, []);

  if (pageState.error) {
    return <div>{pageState.error}</div>;
  }

  if (pageState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          {pageState.products.map(product => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              style={{ display: 'flex' }}
              key={product.id}
            >
              <Card
                style={{ flex: 1 }}
                component={Link}
                href={`/product/${product.id}`}
              >
                <CardActionArea>
                  <CardMedia
                    component='img'
                    style={{ height: 200, objectFit: 'contain' }}
                    image={product.images[0]}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {product.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='body1'
                      color='text.primary'
                    >
                      {product.price} €
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductList;

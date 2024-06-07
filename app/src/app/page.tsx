'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Change the import from 'next/router' to 'next/navigation'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Container from '@mui/material/Container';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
        
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setError('Fetched data is not an array');
          console.error('Fetched data is not an array:', response.data);
        }
      } catch (error) {
        setError('Error fetching the products');
        console.error('Error fetching the products', error);
      }
    };

    fetchProducts();
  }, []); 

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Container maxWidth="xl">
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }} key={product.id}>
            <Card style={{ flex: 1 }} onClick={() => router.push(`/product/${product.id}`)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  style={{ height: 200, objectFit: 'contain' }}
                  image={product.images[0]}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" color="text.primary">
                    {product.price} €
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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

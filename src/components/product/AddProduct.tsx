import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material';
import { useDropzone, Accept } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import { FormattedMessage, useIntl } from 'react-intl'; // Importation de useIntl
import { ScaleLoader } from 'react-spinners';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const intl = useIntl(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setProduct({ ...product, [name]: fileInput.files ? fileInput.files[0] : null });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setProduct({ ...product, image: acceptedFiles[0] });
  };

  const handleRemoveImage = () => {
    setProduct({ ...product, image: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    if (product.image) {
      formData.append('image', product.image);
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(intl.formatMessage({ id: 'error.addProduct', defaultMessage: 'Failed to add product' }));
      }
      const newProduct = await response.json();

      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': [],
    } as Accept,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {intl.formatMessage({ id: 'spinner.loading' })}
        </Typography>
        <ScaleLoader color="#ff1d5e" loading={isLoading} />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={3}>
        <Typography variant="h4" component="h2" gutterBottom>
          {intl.formatMessage({ id: 'product.title' })}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              label={intl.formatMessage({ id: 'product.name' })}
              variant="outlined"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label={intl.formatMessage({ id: 'product.description' })}
              variant="outlined"
              id="description"
              name="description"
              multiline
              rows={4}
              value={product.description}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label={intl.formatMessage({ id: 'product.price' })}
              variant="outlined"
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={1}>
            <Typography variant="h6" gutterBottom>
              {intl.formatMessage({ id: 'product.image' })}
            </Typography>
          </Box>
          <Box
            mb={3}
            {...getRootProps()}
            border="1px dashed grey"
            padding={2}
            bgcolor={isDragActive ? '#e0f7fa' : '#fff'}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <input {...getInputProps()} />
            <Box display="flex" alignItems="center">
              <Typography variant="body1" gutterBottom align="center">
                  {product.image ? product.image.name : intl.formatMessage({ id: 'product.upload.placeholder' })}
              </Typography>
              {product.image && (
                <IconButton onClick={handleRemoveImage} size="small" color="secondary">
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            {isDragActive && (
              <Typography variant="body2" align="center">
                {intl.formatMessage({ id: 'product.upload.dragHere' })}
              </Typography>
            )}
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;

'use client';
import { useRouter } from 'next/navigation';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Button, CardActions } from '@mui/material';

const clubs = [
  { id: 1, title: 'Photography Club', description: 'Capture the world through lenses.', imageUrl: '/images/logos/ACM_logo.jpg' },
  { id: 2, title: 'Coding Club', description: 'Learn and share programming knowledge.', imageUrl: '/images/logos/ACM_logo.jpg' },
  { id: 3, title: 'Art Club', description: 'Express yourself through art.', imageUrl: '/images/logos/ACM_logo.jpg' },
];

const ClubsPage = () => {
  const router = useRouter();

  const handleCardClick = (clubId: number) => {
    // This navigates to the Dashboard page with the `clubId` as query param
    router.push(`/Member/Dashboard?clubId=${clubId}`);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h4" gutterBottom>
        List of clubs you are in
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {clubs.map((club) => (
            <Grid item xs={12} sm={6} md={4} key={club.id}>
              <Card variant="outlined" onClick={() => handleCardClick(club.id)} sx={{ cursor: 'pointer', maxWidth: 380}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"  
                    width="100"   
                    image={club.imageUrl}
                    alt={club.title}
                    sx={{
                      objectFit: 'contain', 
                      margin: 'auto',       
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      {club.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '13px', color: '#8d94b3' }}>
                      {club.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ backgroundColor: '#f8f8f8' }}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: '#f4fbf7',
                        color: '#008767',
                        borderColor: '#c8f4dc',
                        borderWidth: 2,
                        '&:hover': {
                          backgroundColor: '#c8f4dc',
                          color: '#004d3e',
                          borderColor: '#007f5f',
                        },
                        mr: 1,
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ClubsPage;

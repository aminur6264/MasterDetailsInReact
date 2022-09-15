
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Master from './components/master';


function App() {
  return (
      <Box style={{marginTop:'50px'} }>
          <Grid container spacing={2}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                  <Card spacing={2}>
                      <CardContent>
                          <Master />
                      </CardContent>
                  </Card>
              </Grid>
          </Grid>
      </Box>
  );
}

export default App;

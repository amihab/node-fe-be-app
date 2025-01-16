import { useState, useEffect } from "react";
import LoadingLabel from './LoadingLabel';
import {
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //sleep for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await fetch("http://localhost:3000/api/listEnvs");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <div>
          {loading ? (
            <LoadingLabel text="Loading..." />
          ) : (
            <TableContainer variant="outlined" component={Paper}>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.files.map((item) => (
                    <TableRow key={item}>
                      <TableCell>{item}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

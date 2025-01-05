import React, { useState ,useEffect} from "react";
import { Box, Button, TextField, Grid, Typography,Container} from "@mui/material";
import CustomButton from "./ui/CustomButton";
import AddCoinForm from "./AddCoinForm";
import { fetchCoins } from "../utils/apiService";

const CoinsList = ({ coins, onEdit, onDelete }) => {
  const [editingCoin, setEditingCoin] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    quantity: "",
    purchaseTime: "",
    purchasePrice: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditClick = (coin) => {
    setEditingCoin(coin._id);
    setEditForm({
      name: coin.name,
      quantity: coin.quantity,
      purchaseTime: coin.purchaseTime || "",
      purchasePrice: coin.purchasePrice || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await onEdit(editingCoin, editForm);
    setEditingCoin(null);
  };

  const handleAddCoinClick = () => {
    setShowForm(!showForm);
  };
  const refreshCoins = async () => {
    try {
      const fetchedCoins = await fetchCoins();
      coins=fetchedCoins;
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    }
  };

  useEffect(() => {
    refreshCoins(); 
  }, []);

  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return ""; 
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Container>
      <Typography variant="h3">
        Crypto Portfolio{" "}
        <CustomButton onClick={handleAddCoinClick}>
          {showForm ? "Cancel" : "Add Coin"}
        </CustomButton>
      </Typography>
      {showForm && <AddCoinForm refreshCoins={refreshCoins} />}
      {coins.map((coin) => (
        <Box
          key={coin._id}
          sx={{
            border: "1px solid #ccc",
            padding: "16px",
            margin: "8px",
            borderRadius: "8px",
            width: "50%",
          }}
        >
          <Typography variant="h6">{coin.name}</Typography>
          <Typography variant="body1">Quantity: {coin.quantity}</Typography>
          {coin.purchaseTime && (
            <Typography variant="body2">
              Purchase Time: {new Date(coin.purchaseTime).toLocaleString()}
            </Typography>
          )}
          {coin.purchasePrice && (
            <Typography variant="body2">
              Purchase Price: €{coin.purchasePrice}
            </Typography>
          )}

          <CustomButton onClick={() => handleEditClick(coin)}>Edit</CustomButton>
          <Button
            sx={{
              background: "#d32f2f",
              color: "#fff",
              margin: "8px",
            }}
            onClick={() => onDelete(coin._id)}
          >
            Delete
          </Button>
          {editingCoin === coin._id && (
            <Box
              sx={{
                border: "1px solid #2a7f06",
                padding: "16px",
                borderRadius: "8px",
                marginTop: "16px",
              }}
            >
              <Typography variant="h6">Edit Coin</Typography>
              <form onSubmit={handleEditSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="quantity"
                      type="number"
                      value={editForm.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Purchase Time"
                      name="purchaseTime"
                      type="datetime-local"
                      value={formatDateTimeLocal(editForm.purchaseTime)}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Purchase Price (€)"
                      name="purchasePrice"
                      type="number"
                      step="0.01"
                      value={editForm.purchasePrice}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{
                        marginRight: "8px",
                        color: "#2a7f06",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingCoin(null)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default CoinsList;

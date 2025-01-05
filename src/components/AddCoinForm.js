import React, { useState,useEffect } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import CustomButton from "./ui/CustomButton";
import {addCoin} from "../http/apiService";


const AddCoinForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    purchasePrice: "",
    purchaseTime: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    console.log("Form Submitted", formData);
    addCoin(formData);
    setShowForm(false); 
    
    setFormData({
      name: "",
      quantity: "",
      purchasePrice: "",
      purchaseTime: "",
    });
  };


  return (
    <Box>
      
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">Add a New Coin</Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Purchase Price (€)"
            name="purchasePrice"
            type="number"
            value={formData.purchasePrice}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Purchase Time"
            name="purchaseTime"
            type="datetime-local"
            value={formData.purchaseTime}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 2 }}
          />
       
          <CustomButton    onClick={handleFormSubmit}>
          Submit{" "}
        </CustomButton>
        </Box>
      
    </Box>
  )
}

export default AddCoinForm;

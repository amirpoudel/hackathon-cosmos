import React, { useState } from "react";
import {
  Divider,
  Grid,
  IconButton,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FoodCard from "src/component/cards/food_card_order";
import { useDispatch } from "react-redux";
import {
  addOrderAsync,
  setOrderedStatus,
  setCustomerPhoneNumber,
} from "src/redux/restaurantMenuSlice";
import { useParams } from "react-router-dom";
import useLocalStorage from "src/hooks/useLocalStorage";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function CheckoutPopup({ checkedItems, setCheckedItems }) {
  const dispatch = useDispatch();
  const { userName } = useParams();
  const { tableNumber } = useParams();
  const [customerPhoneNumberLocal, setCustomerPhoneNumberLocal] =
    useLocalStorage("customerPhoneNumber");
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const handleCloseUserPopup = () => {
    setOpenUserPopup(false);
  };

  console.log("checked item", checkedItems);

  const handleOrder = () => {
    const itemIdsAndQuantities = checkedItems.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
    }));

    const data = {
      orderItems: itemIdsAndQuantities,
      phoneNumber,
      orderNote,
    };

    dispatch(addOrderAsync({ userName, tableNumber, data })).then((res) => {
      if (addOrderAsync.fulfilled.match(res)) {
        dispatch(setCustomerPhoneNumber(phoneNumber));
        dispatch(setOrderedStatus("pending"));
        setOpenUserPopup(false);
      }
    });
  };

  const handleRemoveQuantity = (itemId) => {
    setCheckedItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  const handleAddQuantity = (itemId) => {
    setCheckedItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <Grid container spacing={3}>
        {checkedItems?.map((checkedItem) => (
          <Grid
            item
            key={checkedItem.itemId}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FoodCard
              itemId={checkedItem?.itemId}
              imagePreview={checkedItem?.imagePreview}
              description={checkedItem?.description}
              price={checkedItem?.price}
              foodName={checkedItem?.foodName}
              checkedItems={checkedItem}
              setCheckedItems={setCheckedItems}
            />
            <Box>
              <Typography variant="subtitle2">
                {checkedItem.quantity} * Quantity
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={() => handleAddQuantity(checkedItem?.itemId)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => handleRemoveQuantity(checkedItem?.itemId)}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
            <Divider />
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => setOpenUserPopup(true)}
        fullWidth
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "#000",
          },
        }}
      >
        Confirm
      </Button>
      <Dialog
        open={openUserPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseUserPopup}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Customer Info</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            size="small"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />

          <TextField
            label="Order Note"
            variant="outlined"
            fullWidth
            size="small"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
          />
          <br />

          <Button
            onClick={handleOrder}
            fullWidth
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            {" "}
            Order
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CheckoutPopup;

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  Badge,
  Divider,
} from "@mui/material";

import FirstSectionCategories from "./component/first_section_categories";
import SecondSectionFoodList from "./component/second_section_food_list";
import CheckoutPopup from "./component/checkout_popup";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function RestaurantOrderMenuView() {
  const [selectedCategoryFoodList, setSelectedCategoryFoodList] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [finalCheckedItems, setFinalCheckedItems] = useState([]);

  const handleCloseCheckoutDialog = () => {
    setOpenCheckout(false);
  };
  return (
    <Box component="main">
      <Box component="section">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: { xs: 2, md: 4, lg: 6 },
          }}
          disableGutters
        >
          <FirstSectionCategories
            setSelectedCategoryFoodList={setSelectedCategoryFoodList}
          />
          <Box sx={{ mt: "4rem" }}>
            <SecondSectionFoodList
              selectedCategoryFoodList={selectedCategoryFoodList}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
            />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          bottom: "4rem",
          position: "fixed",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            color: "white",
            backgroundColor: "black",
            minWidth: "15rem",
            borderRadius: "1rem",
            "&:hover": {
              backgroundColor: "#333333",
              transform: "scale(1.01)",
            },
          }}
          onClick={() => setOpenCheckout(true)}
        >
          <Badge
            badgeContent={checkedItems?.length}
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            Checkout &nbsp;
          </Badge>
        </Button>
      </Box>
      <Dialog
        open={openCheckout}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCheckoutDialog}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Checkout</DialogTitle>
        <Divider />
        <DialogContent>
          <CheckoutPopup
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            finalCheckedItems={finalCheckedItems}
            setFinalCheckedItems={setFinalCheckedItems}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default RestaurantOrderMenuView;

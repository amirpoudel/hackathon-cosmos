import React from "react";

import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  Typography,
} from "@mui/material";

export default function RestaurantCard({ restaurant }) {
  return (
    <Card sx={{ maxWidth: 300, minWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={restaurant?.profileImage || ""}
          alt={restaurant?.name || ""}
          sx={{ backgroundSize: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {restaurant?.name || ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant?.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant?.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

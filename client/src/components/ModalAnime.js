import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Modal,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const ModalAnime = (props) => {
  return (
    <Dialog
      open={props.openModal}
      onClose={props.handleCloseModal}
      fullWidth={true}
      maxWidth={true}
    >
      <DialogTitle>Anime: {props.anime.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Recommendations:</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAnime;

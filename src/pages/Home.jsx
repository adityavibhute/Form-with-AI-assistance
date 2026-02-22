import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backgroundImage from "../assets/background-hero.png";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("${backgroundImage}")`, // <-- Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "#9B6131",
          px: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("welcomeMessage")}
        </Typography>

        <Typography variant="h6" gutterBottom>
          {t("welcomeSubMessage")}
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to="/apply"
          sx={{ mt: 2 }}
        >
          Start Application
        </Button>
      </Box>
    </Box>
  );
}
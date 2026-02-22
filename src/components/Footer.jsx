import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box textAlign="center" p={3} bgcolor="#f5f5f5">
      <Typography variant="body2">
        {t("footerText")} &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

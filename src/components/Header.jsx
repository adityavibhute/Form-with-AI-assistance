import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            {t("title")}
          </Link>
        </Typography>
        <Button color="inherit" onClick={() => changeLanguage("en")}>
          EN
        </Button>
        <Button color="inherit" onClick={() => changeLanguage("ar")}>
          AR
        </Button>
      </Toolbar>
    </AppBar>
  );
}

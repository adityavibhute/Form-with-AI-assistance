import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./index.css";
import MultiStepForm from "./pages/multi-step-form";
import { getTheme } from "./theme";
import { FormProvider } from "./context/FormContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  const { i18n } = useTranslation();

  // Detect language direction
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const theme = useMemo(() => getTheme(direction), [direction]);

  // Update document direction dynamically
  document.dir = direction;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider>
        <Router>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
          >
            <Header />
            {/* Main content */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<MultiStepForm />} />
            </Routes>
            <Footer />
          </Box>
        </Router>
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;

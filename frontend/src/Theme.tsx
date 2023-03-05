import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main
			main: "#0e1e3f" // OXFORD BLUE
			// dark: will be calculated from palette.primary.main
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			// light: will be calculated from palette.secondary.main
			main: "#cce2f1" // BEAU BLUE
			// dark: will be calculated from palette.secondary.main
			// contrastText: will be calculated to contrast with palette.secondary.main
		},
		info: {
			// light: will be calculated from palette.info.main
			main: "#f7e5ca" // CHAMPAGNE
			// dark: will be calculated from palette.info.main
			// contrastText: will be calculated to contrast palette.info.main
		},
		warning: {
			// light: will be calculated from palette.warning.main
			main: "#bfc4c5" // Silver Sand
			// dark: will be calculated from palette.warning.main
			// contrastText: will be calculated to contrast palette.warning.main
		}
	}
});

export { Theme };

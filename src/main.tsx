import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/dropzone/styles.css"
import "@xyflow/react/dist/style.css"
import { MantineProvider } from "@mantine/core"
import { ContextMenuProvider } from "mantine-contextmenu"
import "mantine-contextmenu/styles.layer.css"
import theme from "./theme/theme.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} forceColorScheme="light">
      <ContextMenuProvider>
        <App />
      </ContextMenuProvider>
    </MantineProvider>
  </StrictMode>
)

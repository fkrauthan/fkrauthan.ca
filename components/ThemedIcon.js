import { useTheme } from "next-themes";

import useIsMounted from "./hooks/useIsMounted";

function ThemedIcon({ component: Component, lightColor = "#000000", darkColor = "#ffffff", ...innerProps }) {
  const { theme, systemTheme } = useTheme();
  const isMounted = useIsMounted();

  const color = !isMounted
    ? lightColor
    : theme === "dark" || (theme === "system" && systemTheme === "dark")
    ? darkColor
    : lightColor;

  return <Component color={color} {...innerProps} />;
}

export default ThemedIcon;

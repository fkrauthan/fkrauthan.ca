import { useTheme } from "next-themes";

import useIsMounted from "./hooks/useIsMounted";

function ThemedIcon({ component: Component, lightColor = "#000000", darkColor = "#ffffff", className, ...innerProps }) {
  const { theme, systemTheme } = useTheme();
  const isMounted = useIsMounted();
  const { width = "22px", height = "22px" } = innerProps;

  const color = !isMounted
    ? lightColor
    : theme === "dark" || (theme === "system" && systemTheme === "dark")
    ? darkColor
    : lightColor;

  return (
    <div style={{ width, height, display: "inline-block" }} className={className}>
      <Component color={color} {...innerProps} />
    </div>
  );
}

export default ThemedIcon;

import { useTheme } from "next-themes";

function ThemedIcon({ component: Component, lightColor = "#000000", darkColor = "#ffffff", ...innerProps }) {
  const { theme, systemTheme } = useTheme();

  return (
    <Component
      color={theme === "dark" || (theme === "system" && systemTheme === "dark") ? darkColor : lightColor}
      {...innerProps}
    />
  );
}

export default ThemedIcon;

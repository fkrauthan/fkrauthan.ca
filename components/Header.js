import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import CloseOutline from "react-ionicons/lib/CloseOutline";
import MenuOutline from "react-ionicons/lib/MenuOutline";

import ThemeSwitcher from "./ThemeSwitcher";
import ThemedIcon from "./ThemedIcon";

function MenuLink({ route, title }) {
  return (
    <Link href={route}>
      <a className="block sm:inline text-gray-800 dark:text-gray-300 dark:hover:text-yellow-400 font-bold hover:text-yellow-600 text-lg sm:text-center w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1">
        {title}
      </a>
    </Link>
  );
}

function Header({ content, headerClassName, hideTopNavigation }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const onMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header
      className={clsx("header w-full", content && "min-h-screen", "flex flex-col justify-between", headerClassName)}>
      <nav className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white bg-transparent shadow sm:shadow-none">
        <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <Link href="/">
            <a className="no-underline h-5 text-2xl font-semibold mb-3">Florian Krauthan</a>
          </Link>
          <ThemeSwitcher className="block sm:hidden" />

          {!hideTopNavigation && (
            <button
              id="menuBtn"
              className="hamburger block sm:hidden focus:outline-none"
              type="button"
              onClick={onMenuToggle}
              aria-label="Show Menu">
              {!showMobileMenu && <ThemedIcon component={MenuOutline} width="28px" height="30px" />}
              {showMobileMenu && <ThemedIcon component={CloseOutline} width="28px" height="30px" />}
            </button>
          )}
        </div>
        {!hideTopNavigation && (
          <div
            id="menu"
            className={clsx(
              "w-full pl-5 sm:pl-0 sm:w-auto self-end sm:self-center",
              !showMobileMenu && "hidden",
              "sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0"
            )}>
            <MenuLink route="/about-me" title="About Me" />
            <MenuLink route="/projects" title="Projects" />
            <MenuLink route="/opensource" title="Open-source" />

            <ThemeSwitcher className="hidden sm:block" />
          </div>
        )}
        {hideTopNavigation && <ThemeSwitcher className="hidden sm:block" />}
      </nav>

      {content}
    </header>
  );
}

export default Header;

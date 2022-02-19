import BuyACoffee from "./BuyACoffee";
import Header from "./header";

function Layout({ children, headerContent, headerClassName, hideTopNavigation }) {
  return (
    <>
      <Header content={headerContent} headerClassName={headerClassName} hideTopNavigation={hideTopNavigation} />
      {children && <main>{children}</main>}

      <BuyACoffee />
    </>
  );
}

export default Layout;

import React from "react"
// import Header from "./header"
import "./layout.css"

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Header siteTitle={`Title`} /> */}
      <section
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0.45rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer style={{}}>
          Eight or Infinity © {new Date().getFullYear()}
        </footer>
      </section>
    </>
  )
}

export default Layout
import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../styles/layout.css";
import SimpleReactLightbox from 'simple-react-lightbox'

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.toggleBodyClass);
    this.toggleBodyClass();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleBodyClass);
  }

  toggleBodyClass = () => {
    if (this.state.scrolled && window.scrollY <= 10) {
      this.setState({ scrolled: false });
    } else if (!this.state.scrolled && window.scrollY > 10) {
      this.setState({ scrolled: true });
    }
  };

  render() {
    const {
      children,
      onHideNav,
      onShowNav,
      showNav,
      siteTitle,
      navMenuItems,
      textWhite,
      data,
      absolute
    } = this.props;
    const { scrolled } = this.state;
    return (
      <SimpleReactLightbox>
        <div className="bg-bg">
          <Header
            navMenuItems={navMenuItems}
            siteTitle={siteTitle}
            onHideNav={onHideNav}
            onShowNav={onShowNav}
            showNav={showNav}
            scrolled={scrolled}
            textWhite={textWhite}
            data={data}
            absolute={absolute}
          />
          <>{children}</>
          <Footer siteTitle={siteTitle} data={data} />
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default Layout;

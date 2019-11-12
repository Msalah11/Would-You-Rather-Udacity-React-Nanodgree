import React from "react";
import Header from "./Header";

class Layout extends React.Component{
    render() {
        return (
            <>
                <Header />
                {this.props.children}
            </>
        );
    }
}

export default Layout;

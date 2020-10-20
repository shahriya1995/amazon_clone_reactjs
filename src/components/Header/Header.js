import React from "react";
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import {ShoppingBasket} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useStateValue} from "../Provider";

function Header() {
    const [{basket},dispatch] = useStateValue()

    return (
        <div className="header">
            <Link to="/">
            <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" className="header__logo"/>
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput"/>
                        <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Hello Guest
                    </span>
                    <span className="header__optionLineTwo">
                        Sign In
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        & Orders
                    </span>

                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>

                </div>
                <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingBasket />
                    <span className="headerLineTwo header__basketCount">
                        {basket?.length}
                    </span>
                </div>
                </Link>
            </div>
        </div>
    )

}
export default Header

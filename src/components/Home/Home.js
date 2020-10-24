import React from "react";
import './Home.css'
import Product from "../Product/Product";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image from '../../images/cover-photo-1.png';
import product1 from "../../images/product-1.jpg";
import product2 from "../../images/product-2.jpg";
import product3 from "../../images/product-3.jpg";
import product4 from "../../images/product-4.jpg";

function Home() {
    return (
        <div className="home">

            <div className="home__container">
                <img
                    className="home__image"
                    src={image}
                    alt=""
                />


                <div className="home__row">
                    <Product
                        id="12321341"
                        title="Laptop Stand, ezbnb Ergonomic Height Angle Adjustable Computer Laptop Holder, Laptop Stand for Desk with Big Heat-Vent, Compatible for MacBook Pro/Air, Air, Dell,HP, Samsung All Laptops 8-15"
                        price={39.99}
                        rating={4}
                        image={product1}
                    />
                    <Product
                        id="49538094"
                        title="Feternal Unisex Fashion Adjustable Dust Mask, Floral/Vintage/Christmas Print Mask Washable Reusable Floral Mask for Indoor and Outdoor Party Activities"
                        price={8.99}
                        rating={4}
                        image={product2}
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="4903850"
                        title="The Hundred-Page Machine Learning Book"
                        price={32.99}
                        rating={5}
                        image={product3}
                    />
                    <Product
                        id="23445930"
                        title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                        price={98.99}
                        rating={5}
                        image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                    />
                    <Product
                        id="3254354345"
                        title="iJoy Matte Finish Premium Rechargeable Wireless Headphones Bluetooth Over Ear Headphones Foldable Headset with Mic (Stealth)"
                        price={16.99}
                        rating={4}
                        image={product4}
                    />
                </div>


                <div className="home__row">
                    <Product
                        id="90829332"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                        price={1094.98}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                    />
                </div>
            </div>
        </div>


    )

}
export default Home

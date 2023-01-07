import React from "react";
import bg from "../images/bg2.png";
import img1 from "../images/bg3.png"
import icon1 from "../images/memorize.png"
import icon2 from "../images/approval.png"
import icon3 from "../images/game-controller.png"


import './Home.css';


const Home = () => {
    return (
        <div>
            <section id="home-css">
                <img id="home-bg" src={bg} alt=""></img>
                <div className="wrapper">
                    <span>É</span>
                    <span>P</span>
                    <span>E</span>
                    <span>L</span>
                    <span>L</span>
                    <span>E</span>
                    <span>-</span>
                    <span>M</span>
                    <span>O</span>
                    <span>I</span>
                </div>
                <div>
                    <h1 id="h1Home">@ Devin</h1>
                </div>
                <div id="padding1">
                     
                </div>
            </section>
            <section id="feathers">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <img className="feather-icon" src={icon1} alt='icon1'></img>
                        <h2 className="h2Home">Memorize</h2>
                        <h4>Making your own cards</h4>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <img className="feather-icon" src={icon2}  alt='icon2'></img>
                        <h2 className="h2Home">Free test</h2>
                        <h4>We offer free test for a Epelle-moi contest</h4>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <img className="feather-icon" src={icon3} alt='icon3'></img>
                        <h2 className="h2Home">Fun game</h2>
                        <h4>Games help you keep your words longer</h4>
                    </div>
                </div>
                <img id="feather_image" src={img1} alt='feather_image' />
                
            </section>
            <section>
                <div>
                    <h4>© Copyright Hong Studio</h4>
                </div>
            </section>
        </div>
    )
}

export default Home;
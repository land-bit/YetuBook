import React from "react";
import "./boutique.css"
import boutiqueData from "../../FackApis/boutiqueData.js"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'
import stars from "../../assets/imagesboutique/five-star.jpg"
import prev from "../../assets/imagesboutique/prev.png"
import next from "../../assets/imagesboutique/next.png"
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../components/nav/nav.jsx";


export default function Boutique() {
    return (
        <>
            <div className="boutique">
                <Nav />
                
                <div className="boutHeader" id="footer">
                    {/* <Link to="/"><div className="retour"><span><FontAwesomeIcon icon={faArrowLeft} /></span></div></Link> */}
                    <h3>BusinessWatch</h3>
                    {/* <img className="logo" src={boutiqueData.infoEntreprise.logo} alt="" /> */}
                    <div className="boutnav" id="Homepage">
                        <ul className="boutnavlinks">
                            <li className="active"><a href="#">Home</a></li>
                            {boutiqueData.collections.map((itm, id) => <li><a href={`${itm.nom}'s`}>{itm["nom"]}</a></li>)}
                            <li><a href="#Dedia">Pages</a></li>
                            <li><a href="#Inscription">Features</a></li>
                            <li><a href="#Explore">BI Dashboard</a></li>
                        </ul>
                    </div>
                </div>

                <section className="home">
                    <div className="conteneur">
                        <div className="image0">
                            <h1>We Are {boutiqueData.infoEntreprise.nom}</h1>
                            <div className="p">{boutiqueData.infoEntreprise.description}</div>
                            <div className="btnboutique">
                                <a href="#">Contacts</a>
                            </div>
                        </div>


                        {boutiqueData.collections.map((itm, id) => (
                            <div className={`image${id + 1}`}>
                                <h3>{itm.nom}</h3>
                                <div className="p">{itm.description}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="men categories" id="Men">

                    <div className="mentitre">
                        <h3>{boutiqueData.collections[0].nom}'s Latest</h3>
                        <br />
                        <p>{boutiqueData.collections[0].details}</p>
                        <br />
                    </div>


                    <Swiper style={{ width: '100%' }}
                        slidesPerView={3.5}
                        spaceBetween={10} >
                        {
                            boutiqueData.collections[0].produits.map((itm, id) => (
                                <SwiperSlide>
                                    <div className="products">
                                        <img class={`men${id}`} src={itm.image} alt="image" />
                                        <div class={`menprix${id}`}>
                                            <br />
                                            <div className="nomProduct">{itm.nom}

                                                <img class="fivestar" src={stars} alt="image" />

                                            </div>
                                            <br />
                                            <p>{itm.devise + ' ' + itm.prix}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>


                </section>

                <section className="men categories" id="Men">

                    <div className="mentitre">
                        <h3>{boutiqueData.collections[0].nom}'s Latest</h3>
                        <br />
                        <p>{boutiqueData.collections[0].details}</p>
                        <br />
                    </div>


                    <Swiper style={{ width: '100%' }}
                        slidesPerView={3.5}
                        spaceBetween={10} >
                        {
                            boutiqueData.collections[0].produits.map((itm, id) => (
                                <SwiperSlide>
                                    <div className="products">
                                        <img class={`men${id}`} src={itm.image} alt="image" />
                                        <div class={`menprix${id}`}>
                                            <br />
                                            <div className="nomProduct">{itm.nom}

                                                <img class="fivestar" src={stars} alt="image" />

                                            </div>
                                            <br />
                                            <p>{itm.devise + ' ' + itm.prix}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>


                </section>


                <section className="men categories" id="Men">

                    <div className="mentitre">
                        <h3>{boutiqueData.collections[0].nom}'s Latest</h3>
                        <br />
                        <p>{boutiqueData.collections[0].details}</p>
                        <br />
                    </div>


                    <Swiper style={{ width: '100%' }}
                        slidesPerView={3.5}
                        spaceBetween={10} >
                        {
                            boutiqueData.collections[0].produits.map((itm, id) => (
                                <SwiperSlide>
                                    <div className="products">
                                        <img class={`men${id}`} src={itm.image} alt="image" />
                                        <div class={`menprix${id}`}>
                                            <br />
                                            <div className="nomProduct">{itm.nom}

                                                <img class="fivestar" src={stars} alt="image" />

                                            </div>
                                            <br />
                                            <p>{itm.devise + ' ' + itm.prix}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>


                </section>


                <section className="men categories" id="Men">

                    <div className="mentitre">
                        <h3>{boutiqueData.collections[0].nom}'s Latest</h3>
                        <br />
                        <p>{boutiqueData.collections[0].details}</p>
                        <br />
                    </div>


                    <Swiper style={{ width: '100%' }}
                        slidesPerView={3.5}
                        spaceBetween={10} >
                        {
                            boutiqueData.collections[0].produits.map((itm, id) => (
                                <SwiperSlide>
                                    <div className="products">
                                        <img class={`men${id}`} src={itm.image} alt="image" />
                                        <div class={`menprix${id}`}>
                                            <br />
                                            <div className="nomProduct">{itm.nom}

                                                <img class="fivestar" src={stars} alt="image" />

                                            </div>
                                            <br />
                                            <p>{itm.devise + ' ' + itm.prix}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>


                </section>

            </div>
        </>
    )
}
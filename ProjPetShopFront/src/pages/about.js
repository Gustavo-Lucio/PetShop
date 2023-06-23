/* eslint-disable jsx-a11y/alt-text */
import "./about.css"

export default function About() {

    return (

        <div className="container text-center">
            <div class="custom-title p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal">Sobre</h1>
            </div>
            <div class="row">

                <div class="col-sm">
                    <div className="card-pos">
                        <div className="card">
                            <div class="text_details">
                                <h1 class="title-about">O que queremos? </h1>
                                <p class="text-about">Que você e seu PET tenha um experiência de outro universo! </p>
                                <br></br>
                                <h1 class="title-about">E como faremos isso? </h1>
                                <p class="text-about">Entregando produtos de qualidade, com uma rápida entrega para a alegria sua e do seu PET. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div className="card" >
                        <div class="image_details">
                            <img src={'/assets/images/logo.png'} className="card-img-top" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
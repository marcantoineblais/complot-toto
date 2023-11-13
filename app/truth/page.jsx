"use client"

import React from "react"
import Link from "next/link"
import { wait } from "../helpers"

const Homepage = () => {

    const [colorIndex, setColorIndex] = React.useState(0)
    const [blurImage, setBlurImage] = React.useState(true)
    const homepageRef = React.useRef()
    const confidentialRef = React.useRef()
    const h1Ref = React.useRef()
    const imgRef = React.useRef()

    React.useEffect(() => {
        const borderColors = ['red', 'orange', 'yellow', 'green', 'blue', 'white']
        const colors = {
            red: 'rgb(150, 0, 0)',
            orange: 'rgb(204, 109, 0)',
            yellow: 'rgb(255, 243, 80)',
            green: 'rgb(0, 199, 0)',
            blue: 'rgb(0, 72, 131)',
            white: 'rgb(235, 235, 235)'
        }

        const animate = async () => {
            homepageRef.current.style.border = `10px solid ${colors[borderColors[colorIndex]]}`
            homepageRef.current.style.color = colors[borderColors[colorIndex]]
            confidentialRef.current.style.borderBottom = `5px solid ${colors[borderColors[colorIndex]]}`
            confidentialRef.current.style.color = colors[borderColors[colorIndex]]
            h1Ref.current.style.borderBottom = `5px solid ${colors[borderColors[colorIndex]]}`
            await wait(1000)
            setColorIndex((colorIndex + 1) % borderColors.length)
        }

        if (blurImage) {
            animate()
        } else {
            homepageRef.current.classList.remove('border-padding')
            homepageRef.current.style.border = 'none'
            homepageRef.current.style.color = colors['red']
            confidentialRef.current.style.color = colors['red']
            confidentialRef.current.style.borderBottom = `5px solid ${colors['red']}`
            h1Ref.current.style.borderBottom = `5px solid ${colors['red']}`
        }

    }, [colorIndex, blurImage])

    const unBlur = () => {
        const image = imgRef.current
        for (let i = 0; i < image.children.length; i += 1) {
            image.children[i].classList.remove('zoom-in')
        }
        image.style.filter = "none"
        homepageRef.current.style.height = "fit-content"
        setBlurImage(false)
    }

    return (
        <div ref={homepageRef} className="homepage border-padding">
            <div className="container">
                <div ref={confidentialRef}>
                    <h1 ref={h1Ref}>CONFIDENTIEL</h1>
                    <h3>
                        Les dossiers ci-dessous sont strictement confidentiels.
                        Toute personne partageant son contenu sera passible d'une sentence de haute trahison.
                    </h3>
                    <h2>Poursuivez à vos risques.</h2>
                </div>
                <div className="folder">
                    <div ref={imgRef} className="folder-img">
                        <h2>PROJET: TOTO</h2>

                        <h3>SUJET #1:</h3>
                        <img
                            className="zoom-in"
                            src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/dossier-toto.png"
                            alt="dossier figurant des informations sur Toto"
                        />

                        <h3>SUJET #2:</h3>
                        <img
                            className="zoom-in"
                            src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/dossier-max.png"
                            alt="dossier figurant des informations sur Maxou"
                        />

                        <h3>SUJET #3:</h3>
                        <img
                            className="zoom-in"
                            src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/dossier-monique.png"
                            alt="dossier figurant des informations sur Maxou"
                        />

                        <h3>SUJET #4:</h3>
                        <img
                            className="zoom-in"
                            src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/dossier-jacques.png"
                            alt="dossier figurant des informations sur Maxou"
                        />

                        <h3>OBJECTIFS DU PROJET:</h3>
                        <p>
                            Le projet TOTO fut mis en place en 1980 suite aux nombreux échecs du gouvernement Français visant à contrôler
                            le mental et la personnalité des individus. Le but réel de ces différents projets était toujours le même, prendre le
                            pouvoir des gouvernements des puissances mondiales sans être repéré. Les nombreuses avancées technologiques dans le
                            domaine de la bio-mécanique ont permis la création du projet TOTO, qui offre une alternative au contrôle mental. Grâce
                            au travail de nombreux scientifiques, le projet TOTO est un succès total. Il est désormais possible de créer des clones
                            et de les programmer afin de remplacer n'importe quels individus.
                        </p>

                        <h3>RÉSULTATS DU PROJET:</h3>
                        <p>
                            En 1982, nom de code: "POUPOUNE" est officiellement enceinte du premier sujet. À ce moment, il est clair que
                            nom de code: "TOTO" est en parfaite santé et possède les bons attributs génétiques pour être répliqué avec succès.
                            Le premier clone, nom de code: "MAXOU", fut conçu in vitro quelques semaines plus tard. Il est la parfaite copie de "TOTO",
                            mais l'équipe de scientique à légèrement modifié son ADN afin de le rendre plus vulnérable au conditionnement qui
                            allait suivre sa naissance.
                        </p>

                        <h3>PROCESSUS ET TEST CLINIQUES:</h3>
                        <p>
                            Il n'existe que très peu de preuves sur l'existence du projet, mais l'équipe à conserver un de leur serveur de données actif.
                            Utilisez cette connexion sécurisée pour accéder aux détails du projet: TOTO.
                        </p>

                        <Link href='/server'>SE CONNECTER AU SERVEUR</Link>
                    </div>
                    {blurImage ?
                        <div className="eye">
                            <h3>VISIONNER</h3>
                            <img
                                onClick={() => unBlur()}
                                src="https://nyc3.digitaloceanspaces.com/marc-cloud-storage/Shared/le-complot-toto/images/eye.png"
                                alt="Eye icon"
                            />
                        </div> : null}
                </div>
            </div>
        </div>
    )
}

export default Homepage

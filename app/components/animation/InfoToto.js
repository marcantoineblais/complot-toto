"use client"

import React from "react"
import Age from "./info-toto/Age"
import Name from "./info-toto/Name"
import Relatives from "./info-toto/Relatives"
import { wait } from "../../helpers"


export default function InfoToto({ chars, setActive, freeze }) {

    const [showName, setShowName] = React.useState(false)
    const [showAge, setShowAge] = React.useState(false)
    const [showRelatives, setShowRelatives] = React.useState(false)
    const [activeInfo, setActiveInfo] = React.useState('no-info')

    const infoRef = React.useRef()

    React.useEffect(() => {
        const animate = async () => {
            switch (activeInfo) {
                case 'no-info':
                    await wait(2000)
                    infoRef.current.style.display = "flex"
                    setActiveInfo('name')
                    break

                case 'name':
                    setShowName(true)
                    break

                case 'age':
                    setShowName(false)
                    setShowAge(true)
                    break

                case 'relatives':
                    setShowAge(false)
                    setShowRelatives(true)
                    break

                case 'error':
                    setShowRelatives(false)
                    setActive('error')
                    break

                default:
                    break
            }
        }

        animate()
    }, [activeInfo, setActive])

    return (
        <div ref={infoRef} className="info-toto">
            <div className="top-span">{'<span>'}</div>
            <div className="text">
                {showName ? <Name chars={chars} setActiveInfo={setActiveInfo} /> : null}
                {showAge ? <Age chars={chars} setActiveInfo={setActiveInfo} /> : null}
                {showRelatives ? <Relatives chars={chars} setActiveInfo={setActiveInfo} freeze={freeze} /> : null}
            </div>
            <div className="bottom-span">{'</span>'}</div>
        </div>
    )
}
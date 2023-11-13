"use client"

import React from "react"
import { wait } from "../../helpers"
import VerticalSymbols from "./VerticalSymbols"

export default function ErrorScreen({ chars, setActive }) {

    const [numOfStrings, setNumOfStrings] = React.useState(0)
    const [height, setHeight] = React.useState(0)
    const errorRef = React.useRef()

    React.useEffect(() => {

        const animate = async () => {
            await wait(4500)
            errorRef.current.classList.add('fade-to-white')
            await wait(4400)
            setActive('truth')
        }

        animate()

        const errorDiv = errorRef.current
        setNumOfStrings(errorDiv.clientWidth / 16)
        setHeight(errorDiv.clientHeight)

        window.addEventListener('resize', () => {
            setNumOfStrings(errorDiv.clientWidth / 16)
            setHeight(errorDiv.clientHeight)
        })

        return () => {
            window.removeEventListener('resize', () => {
                setNumOfStrings(errorDiv.clientWidth / 16)
                setHeight(errorDiv.clientHeight)
            })
        }
    }, [setActive])

    const renderedSymbols = () => {
        const array = []
        for (let n = 0; n < numOfStrings; n++) {
            array.push(<VerticalSymbols chars={chars} height={height} key={n} />)
        }
        return array
    }

    return (
        <div ref={errorRef} className="error-screen">
            {renderedSymbols(20)}
            <div className="container">
                <h2 id="fatal">___FATAL_</h2>
                <h2 id="error">_ERROR___</h2>
            </div>
        </div>
    )
}
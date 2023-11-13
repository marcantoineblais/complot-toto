"use client"

import React from "react"
import { wait } from "../../helpers"
import { random } from "../../helpers"

export default function HackingSymbols({ chars, freeze }) {

    const [symbols, setSymbols] = React.useState("")
    const [numOfCharacters, setNumOfCharacters] = React.useState(null)

    const containerRef = React.useRef()

    React.useEffect(() => {
        const container = containerRef.current
        
        setNumOfCharacters(Math.floor((container.clientHeight * container.clientWidth) / 164))

        window.addEventListener('resize', () => {
            setNumOfCharacters(Math.floor((container.clientHeight * container.clientWidth) / 164))
        })

        return () => {
            window.removeEventListener('resize', () => {
                setNumOfCharacters(Math.floor((container.clientHeight * container.clientWidth) / 164))
            })
        }
    }, [])

    React.useEffect(() => {
        const animate = async () => {
            let n = 0
            let characters = ""
            while (n < numOfCharacters) {
                characters += chars[random(chars.length)]
                n += 1
            }
            await wait(20)
            setSymbols(characters)
        }

        if (!freeze) 
            animate()
    }, [symbols, chars, freeze, numOfCharacters])


    return (
        <div ref={containerRef} className="symbols">{symbols}</div>
    )
}
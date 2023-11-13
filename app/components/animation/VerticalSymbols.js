"use client"

import React from 'react'
import { random, wait } from "../../helpers"

export default function VerticalSymbols({ chars, height }) {

    const [text, setText] = React.useState("")
    const [positionX, setPositionX] = React.useState(random(98))
    const [positionY, setPositionY] = React.useState(random(-2, 3))
    const [orientation] = React.useState(random(2) ? 'top' : 'bottom')
    const ref = React.useRef()

    React.useEffect(() => {
        const animate = async () => {
            ref.current.style.left = `${positionX}%`
            if (orientation === 'top') {
                ref.current.style.top = `${positionY}%`
            } else {
                ref.current.style.bottom = `${positionY}%`
            }

            await wait(20)
            setPositionX((positionX + random(1, 6)) % 100)
            setPositionY((positionY - random(1, 6)) % 10)
        }

        if (ref.current) {
            animate()
        }

    })

    React.useEffect(() => {
        let n = 0
        let t = ""
        const numOfChars = Math.floor(height / 16)

        if (orientation === 'top') {
            ref.current.classList.add('top')
        } else {
            ref.current.classList.add('bottom')
        }

        while (n < random(numOfChars / 2, numOfChars)) {
            t += chars[random(chars.length)]
            n += 1
        }

        setText(t)
    }, [chars, orientation, height])

    return (
        <div ref={ref} className="vertical-symbols">{text}</div>
    )
}
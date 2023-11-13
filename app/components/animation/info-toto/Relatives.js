"use client"

import React from "react"
import { random, wait } from "../../../helpers"

export default function Relatives({ chars, setActiveInfo, freeze }) {

    const [text, setText] = React.useState(" ")
    const [textIndex, setTextIndex] = React.useState(0)
    const [direction, setDirection] = React.useState('forward')
    const [blinking, setBlinking] = React.useState(false)
    const age = "[ FAMILLE PROCHE = . . . ]"

    const textRef = React.useRef()

    React.useEffect(() => {
        const animate = async () => {
            if (direction === 'forward') {
                await wait(20)
                setText(age.slice(0, textIndex) + chars[random(chars.length)])
            }
        }

        animate()
    })

    React.useEffect(() => {
        const animate = async () => {
            switch (direction) {
                case 'forward':
                    await wait(100)
                    setTextIndex(textIndex + 1)
                    break

                case 'changing':
                    setText(age)
                    await wait(1000)
                    setDirection('blinking')
                    break

                case 'blinking':
                    freeze(true)
                    await wait(4500)
                    setActiveInfo('error')
                    break

                default:
                    break
            }
        }

        if (textIndex === age.length - 1) {
            setDirection('changing')
        }

        animate()
    }, [textIndex, direction, setActiveInfo, freeze])

    React.useEffect(() => {
        const animate = async () => {
            await wait(500)
            if (!blinking && textRef.current) {
                textRef.current.classList.add('blink')
                setBlinking(true)
            } else if (textRef.current) {
                textRef.current.classList.remove('blink')
                setBlinking(false)
            }
        }

        if (direction === "blinking")
            animate()
    }, [blinking, direction])

    return (
        <div ref={textRef}>{text}</div>
    )
}
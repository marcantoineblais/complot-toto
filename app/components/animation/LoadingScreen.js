"use client"

import React from "react"
import { wait } from "../../helpers"

export default function LoadingScreen({ setActive }) {

    const [activeDot, setActiveDot] = React.useState(0)
    const [isActive, setIsActive] = React.useState(true)

    const contentRef = React.useRef()
    const dot1 = React.useRef()
    const dot2 = React.useRef()
    const dot3 = React.useRef()


    React.useEffect(() => {
        const dots = [dot1, dot2, dot3]
        const animate = async () => {
            if (isActive && activeDot < dots.length) {
                await wait(200)
                dots[activeDot].current.classList.toggle('blink')
                setActiveDot(activeDot + 1)
            } else if (activeDot === dots.length) {
                await wait(300)
                setActiveDot(0)
            }
        }

        animate()
    }, [activeDot, isActive])

    React.useEffect(() => {
        const terminate = async () => {
            await wait(4000)
            contentRef.current.classList.add('blink')
            await wait(1000)
            setIsActive(false)
            await wait(200)
            setActive('hacking')
        }

        terminate()
    }, [setActive])

    return (
        <div className="loading-screen">
            <div className="black-bg">
                <div className="content" ref={contentRef}>
                    <h1>LOADING</h1>
                    <div className="dots">
                        <div className="white-dot" ref={dot1}></div>
                        <div className="white-dot" ref={dot2}></div>
                        <div className="white-dot" ref={dot3}></div>
                    </div>
                    <p id="mute">(CLIQUEZ SUR L&apos;ÉCRAN POUR FERMER L&apos;AUDIO)</p>
                </div>
            </div>
        </div>
    )
}
"use client"

import React from "react"
import { wait } from "../../helpers"

export default function Scanner() {

    const [position, setPosition] = React.useState(0)

    const scannerRef = React.useRef()
    const scanlineTopRef = React.useRef()
    const scanlineBottomRef = React.useRef()
    const scanlineLeftRef = React.useRef()
    const scanlineRightRef = React.useRef()

    React.useEffect(() => {

        const animate = async () => {
            scanlineTopRef.current.style.transform = `translateY(${position}%`
            scanlineBottomRef.current.style.transform = `translateY(-${position}%`
            scanlineLeftRef.current.style.transform = `translateX(${position}%`
            scanlineRightRef.current.style.transform = `translateX(-${position}%`
            await wait(500)
            position ? setPosition(0) : setPosition(8000)
        }

        animate()
    }, [position])

    return (
        <div ref={scannerRef} className="scanner">
            <div ref={scanlineTopRef} id="top" className="scanline"></div>
            <div ref={scanlineBottomRef} id="bottom" className="scanline"></div>
            <div ref={scanlineLeftRef} id="left" className="scanline-vertical"></div>
            <div ref={scanlineRightRef} id="right" className="scanline-vertical"></div>
        </div>
    )
}
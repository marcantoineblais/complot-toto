"use client"

import React from 'react'
import Link from 'next/link'
import { random, sample, wait } from "../../helpers"

export default function TruthScreen({ playNoise }) {

    const [glitching, setGlitching] = React.useState(false)
    const [glitches, setGlitches] = React.useState(null)
    const linkRef = React.useRef()
    const backGroundRef = React.useRef()

    React.useEffect(() => {
        playNoise()
    }, [playNoise])

    React.useEffect(() => {

        const glitchesList = ['left', 'right', 'top', 'bottom', 'zoom-in', 'zoom-out', 'rotate-left', 'rotate-right', 'inverse-color']
        const animate = async () => {
            let effect = sample(glitchesList, random(1, glitchesList.length)).join(' ')
            while (effect === glitches) {
                effect = sample(glitchesList, random(glitches.lenght)).join(' ')
            }
            await wait(20)
            setGlitches(effect)
            if (linkRef.current) {
                linkRef.current.className = glitches
                if (linkRef.current.classList.contains('inverse-color')) {
                    backGroundRef.current.classList.add('inverse-color')
                } else {
                    backGroundRef.current.classList.remove('inverse-color')
                }
            }
        }

        if (glitching) {
            animate()
        } else {
            linkRef.current.className = ""
            backGroundRef.current.classList.remove('inverse-color')
        }

    }, [glitches, glitching])

    React.useEffect(() => {

        const animate = async () => {
            if (glitching) {
                await wait(random(150, 300))
                setGlitching(false)
            } else {
                await wait(random(1200, 2000))
                setGlitching(true)
            }
        }

        animate()

    }, [glitching])

    return (
        <div ref={backGroundRef} className="truth-screen">
            <Link ref={linkRef} href='/truth'>APPRENDRE LA VÉRITÉ</Link>
        </div>
    )
}
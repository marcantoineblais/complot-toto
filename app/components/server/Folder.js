"use client"

import React from "react"
import Window from "./Window"

export default function Folder({ folderName }) {

    const [images, setImages] = React.useState([])
    const [thumbnails, setThumbnails] = React.useState([])
    const [imgWindow, setImgWindow] = React.useState(null)

    const folderRef = React.useRef()

    React.useEffect(() => {
        const renderedContent = async () => {
            const res = await fetch('https://nyc3.digitaloceanspaces.com/marc-cloud-storage')
            const text = await res.text()
            const parser = new DOMParser()
            const doc = await parser.parseFromString(text, 'application/xml')
            const urlList = doc.getElementsByTagName('Contents')
            const imgList = []
            const thumbList = []

            for (let i = 0; i < urlList.length; i++) {
                const image = urlList[i]
                const url = image.getElementsByTagName('Key')[0].innerHTML
                const regex = new RegExp(`.*/${folderName}/.+`)
                if (url.match(regex)) {
                    imgList.push(url)
                    thumbList.push(url.replace(folderName, 'thumbnails'))
                }
            }

            setImages(imgList)
            setThumbnails(thumbList)
        }

        renderedContent()
    }, [folderName])

    const openImage = (content) => {
        setImgWindow(<Window content={content} setActiveWindow={setImgWindow} />)
    }

    const highlightIcon = (e) => {
        const icons = folderRef.current.children

        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.remove('highlight')
        }

        e.currentTarget.classList.add('highlight')
    }

    const removeHighlight = (e) => {
        const icons = folderRef.current.children

        if (e.target === folderRef.current) {
            for (let i = 0; i < icons.length; i++) {
                icons[i].classList.remove('highlight')
            }
        }
    }

    const renderedImg = () => {
        return thumbnails.map((thumb, i) => {
            const url = 'https://marc-cloud-storage.nyc3.digitaloceanspaces.com/'
            const content = {
                title: thumb.split('/')[thumb.split('/').length - 1],
                image: url + images[i]
            }
            
            return (
                <div
                    className="icon"
                    onClick={(e) => highlightIcon(e)}
                    onDoubleClick={() => openImage(content)}
                    key={thumb}
                >
                    <img src={url + thumb} alt="thumbnail" />
                    <p>{content.title}</p>
                </div>
            )
        })
    }

    return (
        <div
            ref={folderRef}
            className="folder"
            onClick={(e) => removeHighlight(e)}
        >
            {imgWindow}
            {renderedImg()}
        </div>
    )
}

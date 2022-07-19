(() => {

    let video = document.querySelector('#screen-video')
    let btnLaunch = document.querySelector('#btn-launch')
    let btnTakePicture = document.querySelector('#btn-take-picture')
    let finalImg = document.querySelector('#final-img')


    btnLaunch.addEventListener('click', () => {

        btnLaunch.disabled = true

        navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(stream => {

            video.width = 640
            video.height = 320

            video.srcObject = stream

            return video.play()

        })
        .then(()=>{

            btnTakePicture.disabled = false

            btnTakePicture.addEventListener('click',()=>{

                let canvas  = document.createElement('canvas')

                let ctx = canvas.getContext('2d')

                canvas.height = video.videoHeight
                canvas.width = video.videoWidth

                ctx.drawImage(video,0,0)


                canvas.toBlob(b=>{

                    finalImg.src = URL.createObjectURL(b)

                    let d = document.querySelector('.image')
                    d.classList.remove('hidden')


                    let download = document.createElement('a')
                    download.download = "capture.png"

                    download.href = URL.createObjectURL(b)
                    download.textContent = "Télecharger"
                    d.appendChild(download)

                })

            })

        })

    })

})()
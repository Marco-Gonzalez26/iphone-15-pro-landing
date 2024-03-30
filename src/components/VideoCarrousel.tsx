/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, useEffect } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const VIDEO_STATES = {
  PLAY: 'play',
  RESET: 'video-reset',
  PAUSE: 'pause',
  END: 'video-end',
  LAST: 'video-last'
}
export const VideoCarrousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])
  const [loadedData, setLoadedData] = useState([])
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false
  })

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video
  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut'
    })
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause()
      } else {
        startPlay && videoRef.current[videoId].play()
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  const handleLoadedMetadata = (i, e) => setLoadedData((prev) => [...prev, e])

  useEffect(() => {
    let currentProgress = 0
    const span = videoSpanRef.current
    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100)

          if (progress != currentProgress) {
            currentProgress = progress
          }

          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? '10vw'
                : window.innerWidth < 1200
                ? '10vw'
                : '4vw'
          })
          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            background: '#FFF'
          })
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })
            gsap.to(span[videoId], {
              background: '#afafaf'
            })
          }
        }
      })

      if (videoId === 0) {
        anim.restart()
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        )
      }
      if (isPlaying) gsap.ticker.add(animUpdate)
      else gsap.ticker.remove(animUpdate)
    }
  }, [videoId, startPlay])

  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case VIDEO_STATES.END:
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i! + 1
        }))

        break
      case VIDEO_STATES.LAST:
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }))
        break

      case VIDEO_STATES.RESET:
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0
        }))
        break
      case VIDEO_STATES.PLAY:
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying
        }))
        break
      case VIDEO_STATES.PAUSE:
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying
        }))
        break
      default:
        return video
    }
  }
  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list, idx) => {
          return (
            <div key={list.id} id='slider' className='sm:pr-20 pr-10 '>
              <div className='video-carousel_container'>
                <div className='w-full h-full rounded-3xl flex-center overflow-hidden bg-black'>
                  <video
                    id='video'
                    playsInline
                    preload='auto'
                    muted
                    className={`${
                      list.id === 2 && 'translate-x-44'
                    } pointer-events-none`}
                    onLoadedMetadata={(e) => handleLoadedMetadata(idx, e)}
                    ref={(el) => (videoRef.current[idx] = el)}
                    onPlay={() => {
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true
                      }))
                    }}
                    onEnded={() =>
                      idx !== 3
                        ? handleProcess(VIDEO_STATES.END, idx)
                        : handleProcess(VIDEO_STATES.LAST)
                    }>
                    <source src={list.video} type='video/mp4' />
                  </video>
                </div>
                <div className='absolute top-12 left-[5%] z-10'>
                  {list.textLists.map((text) => {
                    return (
                      <p key={text} className='md:text-2xl text-xl font-medium'>
                        {text}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
          {videoRef.current.map((_, idx) => {
            return (
              <span
                key={idx}
                ref={(el) => (videoDivRef.current[idx] = el)}
                className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                <span
                  className='absolute h-full w-full rounded-full'
                  ref={(el) => (videoSpanRef.current[idx] = el)}
                />
              </span>
            )
          })}
        </div>
        <button
          className='control-btn'
          onClick={
            isLastVideo
              ? () => handleProcess(VIDEO_STATES.RESET, videoId)
              : !isPlaying
              ? () => handleProcess(VIDEO_STATES.PLAY, videoId)
              : () => handleProcess(VIDEO_STATES.PAUSE, videoId)
          }>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
          />
        </button>
      </div>
    </>
  )
}

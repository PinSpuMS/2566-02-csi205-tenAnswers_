import { useEffect, useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

function App() {
  const [normalMode, setNormalMode] = useState(true)
  const [answer, setAnswer] = useState(0)
  const [remain, setRemain] = useState(10)
  const [minimal, setMinimal] = useState(0)
  const [maximal, setMaximal] = useState(99)

  useEffect(() => {
    initGame()
  }, [])

  useEffect(() => {
    if (remain <= 0) {
      alert('YOU LOSE (Answer: ' + answer + ')')
      initGame()
    }
  }, [remain])

  const resultRef = useRef()
  const minRef = useRef()
  const maxRef = useRef()
  const inputRef = useRef()

  const genAnswer = () => {
    let a = Math.round(Math.random() * 99)
    // console.log('Ans: ' + a)
    return a
  }

  const initGame = () => {
    setAnswer(genAnswer())
    resultRef.current.style.visibility = 'hidden'
    setRemain(10)
    setMinimal(0)
    setMaximal(99)
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  const sendClicked = () => {
    if (inputRef.current.value === '') {
      alert('Error: no answer found')
      inputRef.current.focus()
      return
    }

    if (Number(inputRef.current.value) < answer) {
      if (Number(inputRef.current.value) >= minimal)
        setMinimal(Number(inputRef.current.value) + 1)
      resultRef.current.style.color = '#0000ff'
      resultRef.current.innerText = inputRef.current.value + ' น้อยเกินไป'
      // console.log(resultRef)
      resultRef.current.style.visibility = 'visible'
      minRef.current.style.color = '#0000ff'
      inputRef.current.value = ''
      inputRef.current.focus()
    } else if (Number(inputRef.current.value) > answer) {
      if (Number(inputRef.current.value) <= maximal)
        setMaximal(Number(inputRef.current.value) - 1)
      resultRef.current.style.color = '#ff0000'
      resultRef.current.innerText = inputRef.current.value + ' มากเกินไป'
      resultRef.current.style.visibility = 'visible'
      maxRef.current.style.color = '#ff0000'
      inputRef.current.value = ''
      inputRef.current.focus()
    } else {
      alert('YOU WIN (Anser: ' + answer + ')')
      initGame()
      return
    }

    setRemain((prev) => prev - 1)
  }
  const inputKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendClicked()
    } else {
      minRef.current.style.color = '#000000'
      maxRef.current.style.color = '#000000'
      resultRef.current.style.visibility = 'hidden'
    }
  }

  return (
    <>
      <div className='main-container'>
        <div className='title'>
          <img src='./image/title-text.png' alt='title' />
        </div>

        <div className='mode'>
          <button
            onClick={() => {
              setNormalMode(false)
              inputRef.current.focus()
            }}
            className={normalMode ? '' : ' push'}
          >
            โหมดง่าย
          </button>
          <button
            onClick={() => {
              setNormalMode(true)
              inputRef.current.focus()
            }}
            className={normalMode ? ' push' : ''}
          >
            โหมดปกติ
          </button>
        </div>

        <div className='input'>
          <span className='input-left'>
            <div style={{ fontSize: 'xx-large' }}>เลขที่ทายคือ</div>
            <div style={{ fontSize: 'x-large' }}>(ระหว่าง 0-99)</div>
          </span>
          <span className='input-right'>
            <input
              onKeyDown={inputKeyDown}
              className='input-text'
              type='number'
              max='99'
              min='0'
              ref={inputRef}
            />
            <button
              onClick={sendClicked}
              style={{
                width: '150px',
                backgroundColor: '#a5fd7c',
              }}
            >
              ส่งคำตอบ
            </button>
          </span>
        </div>

        <div className='result' ref={resultRef}>
          50 มากเกินไป
        </div>

        <div className='spacing'></div>

        <div className={'hint' + (normalMode ? ' hide' : ' visible')}>
          <div style={{ fontSize: 'xx-large' }}>เลขที่ยังเหลืออยู่</div>
          <div className='hint-number'>
            <span className='number' ref={minRef}>
              {minimal}
            </span>
            <img src='./image/arrow.png' alt='arrow' />
            <span className='number' ref={maxRef}>
              {maximal}
            </span>
          </div>
        </div>

        <div className={'summary' + (remain <= 3 ? ' red' : '')}>
          เหลือจำนวนการทาย {remain} ครั้ง
        </div>
      </div>
      <script type='module' src='/src/main.jsx'></script>
    </>
  )
}

export default App

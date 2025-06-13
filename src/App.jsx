import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [isNumbers, setIsNumbers] = useState(false)
  const [isSymbols, setIsSymbols] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let pass = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (isNumbers) characters += '0123456789'
    if (isSymbols) characters += '!@#$%^&*()[]{}?/'

    for (let i = 1; i <= length; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length))
      pass += char
    }
    setPassword(pass)
  }, [length, isNumbers, isSymbols])

  const passRef = useRef(null)

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, isNumbers, isSymbols])

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/30 border border-white/50 shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-6">🔐 Password Generator</h1>

        <div className="flex items-center mb-6">
          <input
            type="text"
            value={password}
            ref={passRef}
            readOnly
            className="flex-1 px-4 py-2 rounded-l-lg text-sm bg-white/80 text-gray-700 outline-none"
          />
          <button
            onClick={copyPassword}
            className={`px-4 py-2 rounded-r-lg font-semibold text-white transition-colors ${
              isCopied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex flex-col gap-4 text-white">
          <div className="flex justify-between items-center">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-1/2 accent-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Include Numbers</label>
            <input
              type="checkbox"
              checked={isNumbers}
              onChange={() => setIsNumbers((prev) => !prev)}
              className="w-5 h-5 accent-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Include Symbols</label>
            <input
              type="checkbox"
              checked={isSymbols}
              onChange={() => setIsSymbols((prev) => !prev)}
              className="w-5 h-5 accent-white"
            />
          </div>

          <button
            onClick={generatePassword}
            className="mt-4 w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-colors"
          >
            🔁 Regenerate Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
  
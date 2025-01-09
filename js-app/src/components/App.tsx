import React, { useState } from 'react'
import { fibonacci as wasmFibonacci } from '../../../rust-app/pkg/rust_app'

const App: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [resultJS, setResultJS] = useState<number | null>(null)
  const [resultWasm, setResultWasm] = useState<number | null>(null)
  const [timeJS, setTimeJS] = useState<string | null>(null)
  const [timeWasm, setTimeWasm] = useState<string | null>(null)

  // JavaScript implementation of Fibonacci
  const jsFibonacci = (n: number): number => {
    if (n === 0) return 0
    if (n === 1) return 1
    return jsFibonacci(n - 1) + jsFibonacci(n - 2)
  }

  const handleMeasure = async (): Promise<void> => {
    const n = parseInt(input, 10)
    if (isNaN(n) || n < 0) {
      alert('Please enter a valid non-negative integer.')
      return
    }

    // Measure JavaScript Fibonacci
    const startJS = performance.now()
    const resultFromJS = jsFibonacci(n)
    const endJS = performance.now()
    setResultJS(resultFromJS)
    setTimeJS((endJS - startJS).toFixed(2))

    // Measure WebAssembly Fibonacci
    const startWasm = performance.now()
    const resultFromWasm = wasmFibonacci(n)
    const endWasm = performance.now()
    setResultWasm(resultFromWasm)
    setTimeWasm((endWasm - startWasm).toFixed(2))
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">WebAssembly POC</h1>
        <p className="text-lg">
          This is a proof of concept for using WebAssembly in a React
          application.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <input
          type="number"
          className="rounded border-2 border-gray-300 p-2"
          placeholder="Enter n"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleMeasure}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Measure
        </button>
      </div>
      {resultJS !== null && resultWasm !== null && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">Results</h2>
          <p>
            <strong>JavaScript Result:</strong> {resultJS} (Time: {timeJS}ms)
          </p>
          <p>
            <strong>WebAssembly Result:</strong> {resultWasm} (Time: {timeWasm}
            ms)
          </p>
        </div>
      )}
    </div>
  )
}

export default App

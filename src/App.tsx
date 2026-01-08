import './App.css'

function App() {
  
  const fetchBlock = async (formData: FormData) => {
    const hash = formData.get('hash')
    const response = await fetch(`https://blockchain.info/rawblock/${hash}`)
    console.log(response)
  }

  return (
    <>
      <form action={fetchBlock}>
        <input name='hash' />
        <button type='submit'>Find</button>
      </form>
    </>
  )
}

export default App

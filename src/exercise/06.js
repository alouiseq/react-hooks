// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(()=> {
    const getPokemon = async () => {
      let pokemonData

      try {
        pokemonData = await fetchPokemon(pokemonName)
      } catch(err) {
        setError(err)
      }

      setPokemon(pokemonData)
    }
    if (pokemonName) getPokemon()

    return () => {
      setPokemon(null)
      setError(null)
    }
  }, [pokemonName])

  if (error) return <ErrorInfo error={error} />
  else if (pokemon) return <PokemonDataView pokemon={pokemon} />
  else if (pokemonName) return <PokemonInfoFallback name={pokemonName} />
  else return 'Submit a pokemon'
}

function ErrorInfo({error}) {
  return <div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  </div>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

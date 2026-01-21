import { useEffect, useState } from 'react'
import './App.css'

const rest_api_url = "http://localhost:11000/api/libri"

const fetch_libri = async () => {
  const response = await fetch(rest_api_url)
  const data = await response.json()
  return data
}

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const libri = await fetch_libri()
      setData(libri)
    }
    fetchData()
  }, [])

  return (
    <div className="page page-plain">
      <header className="navbar">
        <div className="brand">📚 Libreria</div>
        <div className="actions">
          <button className="btn primary" disabled>
            + Aggiungi Libro
          </button>
          <button className="btn" disabled>
            🗑 Rimuovi Libro
          </button>
        </div>
      </header>

      <section className="content">
        {data.length === 0 ? (
          <div className="empty">Nessun libro in libreria. Aggiungi il primo!</div>
        ) : (
          <div className="book-grid">
            {data.map((libro) => (
              <div className="book-item" key={libro.id}>
                <div className="book-title">{libro.titolo}</div>
                <div className="book-meta">
                  <span className="muted">{libro.autore}</span>
                  <span className="tag">{libro.genere}</span>
                </div>
                <div className="book-footer">
                  <span>{libro.anno}</span>
                  <span className="muted">{libro.isbn}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App

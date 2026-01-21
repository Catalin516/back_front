import { useEffect, useState } from 'react'
import './App.css'

const rest_api_url = "http://localhost:11000/api/libri"

const generi = [
  'Fantasy',
  'Sci-Fi',
  'Mystery',
  'Thriller',
  'Romance',
  'Horror',
  'Historical Fiction',
  'Biography',
  'Autobiography',
  'Non-Fiction',
  'Poetry',
  'Drama',
  'Comedy',
  'Adventure',
  'Young Adult',
  'Children',
  'Philosophy',
  'Religion',
  'Self-Help',
  'Business'
]

const fetch_libri = async () => {
  const response = await fetch(rest_api_url)
  const data = await response.json()
  return data
}

const post_libro = async(libro) => {
  const response = await fetch(rest_api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(libro)
  })
  await response.json()
  return response
}

const clear_libreria = async() => {
  const response = await fetch(rest_api_url , {method: 'DELETE'})
  await response.json()
  return response
}

const remove_libro = async(id_libro) => { 
  const response = await fetch(rest_api_url + '/' + id_libro, {
    method: 'DELETE'
  })
  await response.json()
  return response
}

function App() {
  const [data, setData] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showRemoveForm, setShowRemoveForm] = useState(false)
  const [formData, setFormData] = useState({
    titolo: '',
    autore: '',
    genere: '',
    anno: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const libri = await fetch_libri()
      setData(libri)
    }
    fetchData()
  }, [])

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    const nuovoLibro = {
      titolo: formData.titolo,
      autore: formData.autore,
      genere: formData.genere,
      anno: parseInt(formData.anno)
    }
    
    await post_libro(nuovoLibro)
    const libri = await fetch_libri()
    setData(libri)
    setShowAddForm(false)
    setFormData({ titolo: '', autore: '', genere: '', anno: '' })
  }

  const handleRemoveSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const libroId = form.libroId.value
    
    if (libroId === 'all') {
      await clear_libreria()
    } else {
      await remove_libro(parseInt(libroId))
    }
    
    const libri = await fetch_libri()
    setData(libri)
    setShowRemoveForm(false)
  }

  const remove = (id_libro) => {
    remove_libro(id_libro).then(() => {
      fetch_libri().then((data) => setData(data))
    })
  }

  const clear = () => {
    clear_libreria().then(() => {
      fetch_libri().then((data) => setData(data))
    })
  }


  return (
    <div className="page page-plain">
      <header className="navbar">
        <div className="brand">📚 Libreria</div>
        <div className="actions">
          <button className="btn primary" onClick={() => setShowAddForm(true)}>
            + Aggiungi Libro
          </button>
          <button className="btn" onClick={() => setShowRemoveForm(true)}>
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

      {/* Form Aggiungi Libro */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Aggiungi Nuovo Libro</h2>
              <button className="modal-close" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Titolo</label>
                <input
                  type="text"
                  value={formData.titolo}
                  onChange={(e) => setFormData({ ...formData, titolo: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Autore</label>
                <input
                  type="text"
                  value={formData.autore}
                  onChange={(e) => setFormData({ ...formData, autore: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Genere</label>
                <select
                  value={formData.genere}
                  onChange={(e) => setFormData({ ...formData, genere: e.target.value })}
                  required
                >
                  <option value="">-- Seleziona un genere --</option>
                  {generi.map((genere) => (
                    <option key={genere} value={genere}>
                      {genere}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Anno</label>
                <input
                  type="number"
                  value={formData.anno}
                  onChange={(e) => setFormData({ ...formData, anno: e.target.value })}
                  required
                  min="1000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn" onClick={() => setShowAddForm(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn primary">
                  Aggiungi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Form Rimuovi Libro */}
      {showRemoveForm && (
        <div className="modal-overlay" onClick={() => setShowRemoveForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Rimuovi Libro</h2>
              <button className="modal-close" onClick={() => setShowRemoveForm(false)}>×</button>
            </div>
            <form onSubmit={handleRemoveSubmit} className="modal-form">
              <div className="form-group">
                <label>Seleziona libro da rimuovere</label>
                <select name="libroId" required>
                  <option value="">-- Seleziona un libro --</option>
                  <option value="all">Rimuovi tutti i libri</option>
                  {data.map((libro) => (
                    <option key={libro.id} value={libro.id}>
                      {libro.titolo} - {libro.autore}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn" onClick={() => setShowRemoveForm(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn" style={{ background: '#dc2626', color: '#fff' }}>
                  Rimuovi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import GuitarDetails from './components/GuitarDetails'
import GuitarForm from './components/GuitarForm'
import GuitarTable from './components/GuitarTable'
import styles from './App.module.css'

function App() {
  const [guitars, setGuitars] = useState([])
  const [currentView, setCurrentView] = useState('form')
  const [selectedGuitar, setSelectedGuitar] = useState(null)
  const [activeGuitar, setActiveGuitar] = useState(null)
  const [roleFilter, setRoleFilter] = useState('All')

  useEffect(() => {
    if (selectedGuitar) {
      setActiveGuitar(selectedGuitar)
    }
  }, [selectedGuitar])

  function addGuitar(newGuitar) {
    setGuitars([...guitars, newGuitar])
    setCurrentView('table')
  }

  function selectGuitar(guitar) {
    setSelectedGuitar(guitar)
  }

  const filteredGuitars = guitars.filter((guitar) => {
    if (roleFilter === 'All') {
      return true
    }
    return guitar.role === roleFilter
  })

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>GS</div>
          <div>
            <p className={styles.eyebrow}>Guitar Store</p>
            <h1 className={styles.title}>Inventory Manager</h1>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.welcomeCard}>
          <div>
            <p className={styles.sectionLabel}>Inventory workspace</p>
            <h2>Manage every guitar in one place.</h2>
            <p className={styles.description}>
              Register guitar information, browse the inventory, and view the
              complete details of a selected item.
            </p>
            <div className={styles.viewButtons}>
              <button
                className={currentView === 'form' ? styles.activeButton : ''}
                type="button"
                onClick={() => setCurrentView('form')}
              >
                Registration Form
              </button>
              <button
                className={currentView === 'table' ? styles.activeButton : ''}
                type="button"
                onClick={() => setCurrentView('table')}
              >
                Registry Table
              </button>
            </div>
          </div>
          <div className={styles.guitarMark} aria-hidden="true">♪</div>
        </section>

        <section className={styles.overview} aria-labelledby="overview-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionLabel}>Project workflow</p>
              <h2 id="overview-title">Inventory overview</h2>
            </div>
            <span>3 simple steps</span>
          </div>

          <div className={styles.steps}>
            <article className={styles.stepCard}>
              <span className={styles.stepNumber}>01</span>
              <h3>Register</h3>
              <p>Add a guitar and validate its inventory information.</p>
            </article>
            <article className={styles.stepCard}>
              <span className={styles.stepNumber}>02</span>
              <h3>Browse</h3>
              <p>Review saved guitars in a clear, paginated table.</p>
            </article>
            <article className={styles.stepCard}>
              <span className={styles.stepNumber}>03</span>
              <h3>Inspect</h3>
              <p>Select a row to display the guitar's complete profile.</p>
            </article>
          </div>
        </section>

        {currentView === 'form' ? (
          <section className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Register a guitar</h2>
              </div>
              <span>{guitars.length} guitar(s) registered</span>
            </div>
            <GuitarForm onAddGuitar={addGuitar} />
          </section>
        ) : (
          <section className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Guitar registry</h2>
              </div>
              <span>
                Showing {filteredGuitars.length} of {guitars.length} record(s)
              </span>
            </div>
            <div className={styles.filterBar}>
              <label htmlFor="roleFilter">Filter by user role</label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <option value="All">All roles</option>
                <option value="Merchant">Merchant</option>
                <option value="Consumer">Consumer</option>
              </select>
            </div>
            <div className={styles.registryLayout}>
              <GuitarTable
                guitars={filteredGuitars}
                selectedGuitar={selectedGuitar}
                onSelectGuitar={selectGuitar}
              />
              <GuitarDetails guitar={activeGuitar} />
            </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Guitar Store Inventory Manager</p>
      </footer>
    </div>
  )
}

export default App

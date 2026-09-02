import styles from './GuitarDetails.module.css'

function GuitarDetails({ guitar }) {
  if (!guitar) {
    return (
      <aside className={styles.card}>
        <p className={styles.label}>Active item</p>
        <h3>No guitar selected</h3>
        <p className={styles.instruction}>
          Click a row in the table to view its complete information.
        </p>
      </aside>
    )
  }

  return (
    <aside className={styles.card}>
      <div className={styles.heading}>
        <div>
          <p className={styles.label}>Active item</p>
          <h3>{guitar.model}</h3>
        </div>
        <span className={styles.roleBadge}>{guitar.role}</span>
      </div>

      <dl className={styles.details}>
        <div>
          <dt>Body Type</dt>
          <dd>{guitar.bodyType}</dd>
        </div>
        <div>
          <dt>Brand</dt>
          <dd>{guitar.brand}</dd>
        </div>
        <div>
          <dt>Stock Quantity</dt>
          <dd>{guitar.stock}</dd>
        </div>
        <div>
          <dt>Manufacturer</dt>
          <dd>{guitar.manufacturer}</dd>
        </div>
      </dl>
    </aside>
  )
}

export default GuitarDetails

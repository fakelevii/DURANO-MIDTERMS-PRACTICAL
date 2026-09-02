import { useState } from 'react'
import styles from './GuitarForm.module.css'

function GuitarForm({ onAddGuitar }) {
  const [model, setModel] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [role, setRole] = useState('')

  const [modelError, setModelError] = useState('')
  const [bodyTypeError, setBodyTypeError] = useState('')
  const [brandError, setBrandError] = useState('')
  const [stockError, setStockError] = useState('')
  const [manufacturerError, setManufacturerError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function validateModel(value) {
    if (value.trim().length < 3) {
      return 'Guitar model must contain at least 3 characters.'
    }
    return ''
  }

  function validateRequired(value, fieldName) {
    if (value.trim() === '') {
      return fieldName + ' is required.'
    }
    return ''
  }

  function validateStock(value) {
    if (value === '') {
      return 'Stock quantity is required.'
    }
    if (Number(value) < 1 || Number(value) > 100) {
      return 'Stock quantity must be from 1 to 100.'
    }
    return ''
  }

  function handleModelChange(event) {
    setModel(event.target.value)
    setModelError(validateModel(event.target.value))
    setSuccessMessage('')
  }

  function handleBodyTypeChange(event) {
    setBodyType(event.target.value)
    setBodyTypeError(validateRequired(event.target.value, 'Body type'))
    setSuccessMessage('')
  }

  function handleBrandChange(event) {
    setBrand(event.target.value)
    setBrandError(validateRequired(event.target.value, 'Brand name'))
    setSuccessMessage('')
  }

  function handleStockChange(event) {
    setStock(event.target.value)
    setStockError(validateStock(event.target.value))
    setSuccessMessage('')
  }

  function handleManufacturerChange(event) {
    setManufacturer(event.target.value)
    setManufacturerError(validateRequired(event.target.value, 'Manufacturer name'))
    setSuccessMessage('')
  }

  function handleRoleChange(event) {
    setRole(event.target.value)
    setRoleError('')
    setSuccessMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const currentModelError = validateModel(model)
    const currentBodyTypeError = validateRequired(bodyType, 'Body type')
    const currentBrandError = validateRequired(brand, 'Brand name')
    const currentStockError = validateStock(stock)
    const currentManufacturerError = validateRequired(
      manufacturer,
      'Manufacturer name',
    )
    const currentRoleError = validateRequired(role, 'User role')

    setModelError(currentModelError)
    setBodyTypeError(currentBodyTypeError)
    setBrandError(currentBrandError)
    setStockError(currentStockError)
    setManufacturerError(currentManufacturerError)
    setRoleError(currentRoleError)

    if (
      currentModelError ||
      currentBodyTypeError ||
      currentBrandError ||
      currentStockError ||
      currentManufacturerError ||
      currentRoleError
    ) {
      setSuccessMessage('')
      return
    }

    const newGuitar = {
      id: Date.now(),
      model: model.trim(),
      bodyType,
      brand: brand.trim(),
      stock: Number(stock),
      manufacturer: manufacturer.trim(),
      role,
    }

    onAddGuitar(newGuitar)
    setSuccessMessage(model.trim() + ' was registered successfully.')
    setModel('')
    setBodyType('')
    setBrand('')
    setStock('')
    setManufacturer('')
    setRole('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="model">Guitar Model</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={handleModelChange}
            placeholder="Example: Stratocaster"
          />
          {modelError && <p className={styles.error}>{modelError}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="bodyType">Body Type</label>
          <select id="bodyType" value={bodyType} onChange={handleBodyTypeChange}>
            <option value="">Select a body type</option>
            <option value="Electric">Electric</option>
            <option value="Acoustic">Acoustic</option>
            <option value="Bass">Bass</option>
            <option value="Classical">Classical</option>
          </select>
          {bodyTypeError && <p className={styles.error}>{bodyTypeError}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="brand">Brand Name</label>
          <input id="brand" type="text" value={brand} onChange={handleBrandChange} placeholder="Example: Fender" />
          {brandError && <p className={styles.error}>{brandError}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="stock">Stock Quantity</label>
          <input id="stock" type="number" min="1" max="100" value={stock} onChange={handleStockChange} placeholder="1 to 100" />
          {stockError && <p className={styles.error}>{stockError}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="manufacturer">Manufacturer Name</label>
          <input id="manufacturer" type="text" value={manufacturer} onChange={handleManufacturerChange} placeholder="Enter manufacturer" />
          {manufacturerError && <p className={styles.error}>{manufacturerError}</p>}
        </div>

        <fieldset className={styles.roleField}>
          <legend>User Role</legend>
          <div className={styles.radioOptions}>
            <label><input type="radio" name="role" value="Merchant" checked={role === 'Merchant'} onChange={handleRoleChange} /> Merchant</label>
            <label><input type="radio" name="role" value="Consumer" checked={role === 'Consumer'} onChange={handleRoleChange} /> Consumer</label>
          </div>
          {roleError && <p className={styles.error}>{roleError}</p>}
        </fieldset>
      </div>

      <button className={styles.submitButton} type="submit">Register Guitar</button>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  )
}

export default GuitarForm

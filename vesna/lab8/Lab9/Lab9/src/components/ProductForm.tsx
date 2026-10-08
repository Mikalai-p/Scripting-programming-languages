import { useState } from 'react'
import { z } from 'zod'
import type { Product } from '../types'

const FormSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  price: z.coerce.number().positive('Цена должна быть строго больше 0'),
  category: z.string().optional(),
})

type FormData = z.infer<typeof FormSchema>

interface ProductFormProps {
  productToEdit?: Product
  onClose: () => void
  onSuccess: (savedProduct: Product) => void
}

export const ProductForm = ({ productToEdit, onClose, onSuccess }: ProductFormProps) => {
  const isEditing = !!productToEdit

  const [formData, setFormData] = useState({
    title: productToEdit?.title ?? '',
    price: productToEdit?.price?.toString() ?? '',
    category: productToEdit?.category ?? '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = FormSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    if (isEditing && productToEdit) {
      const updatedProduct: Product = {
        ...productToEdit,
        title: result.data.title,
        price: result.data.price,
        category: result.data.category,
      }
      onSuccess(updatedProduct)
    } else {
      const newProduct: Product = {
        id: Date.now(), 
        title: result.data.title,
        price: result.data.price,
        category: result.data.category,
      }
      onSuccess(newProduct)
    }
    onClose()
  }


  return (
    <div style={{ 
      border: '2px solid blue', 
      padding: '20px', 
      marginBottom: '20px', 
      borderRadius: '8px', 
      fontFamily: 'sans-serif' 
    }}>
      <h3>{isEditing ? 'Редактировать товар' : 'Добавить товар'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Название: </label>
          <input 
            value={formData.title} 
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))} 
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.title && <div style={{ color: 'red', fontSize: '12px' }}>{errors.title}</div>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Цена: </label>
          <input 
            type="number" 
            step="0.01" 
            value={formData.price} 
            onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))} 
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.price && <div style={{ color: 'red', fontSize: '12px' }}>{errors.price}</div>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Категория: </label>
          <input 
            value={formData.category} 
            onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))} 
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>Отмена</button>
          <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
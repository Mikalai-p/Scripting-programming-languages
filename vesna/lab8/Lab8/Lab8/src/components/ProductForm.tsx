import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import type { Product } from '../types'
import { addProduct, updateProduct } from '../api/products'

const FormSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  price: z.coerce.number().positive('Цена должна быть строго больше 0'),
  category: z.string().optional(),
})

type FormData = z.infer<typeof FormSchema>

interface ProductFormProps {
  productToEdit?: Product
  onClose: () => void
}

export const ProductForm = ({ productToEdit, onClose }: ProductFormProps) => {
  const queryClient = useQueryClient()
  const isEditing = !!productToEdit

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  // Заполняем форму при редактировании
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title || '',
        price: productToEdit.price?.toString() || '',
        category: productToEdit.category || '',
      })
    }
  }, [productToEdit])

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const processedData = {
        title: data.title,
        price: Number(data.price),
        category: data.category || undefined,
      }
      
      if (isEditing && productToEdit) {
        return updateProduct({ ...productToEdit, ...processedData })
      }
      return addProduct(processedData)
    },
    
    onSuccess: () => {
      // Сбрасываем кеш продуктов
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onClose()
    },
    
    onError: (error) => {
      console.error('Ошибка:', error)
      alert(`Ошибка: ${(error as Error).message}`)
    },
  })

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
    mutation.mutate(result.data)
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
          />
          {errors.price && <div style={{ color: 'red', fontSize: '12px' }}>{errors.price}</div>}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Категория: </label>
          <input 
            value={formData.category} 
            onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))} 
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
      
      {/* Отладка: показываем статус */}
      {mutation.isError && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Ошибка: {(mutation.error as Error)?.message}
        </div>
      )}
    </div>
  )
}
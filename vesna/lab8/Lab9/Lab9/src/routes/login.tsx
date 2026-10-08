import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useReducer } from 'react'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

const RegistrationSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Неверный формат email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  username: z.string().min(1, 'Имя пользователя не может быть пустым'),
  city: z.string().min(1, 'Город не может быть пустым'),
  occupation: z.string().min(1, 'Выберите род деятельности'),
  agreeToRules: z.boolean().refine((val) => val === true, 'Вы должны согласиться с правилами'),
})

type FormData = z.infer<typeof RegistrationSchema>

const step1Schema = RegistrationSchema.pick({ email: true, password: true })
const step2Schema = RegistrationSchema.pick({ username: true, city: true })
const step3Schema = RegistrationSchema.pick({ occupation: true, agreeToRules: true })

interface FormState {
  currentStep: number
  formData: FormData
  errors: Partial<Record<keyof FormData, string>>
  isSubmitting: boolean
}

type FormAction =
  | { type: 'UPDATE_FIELD'; payload: { field: keyof FormData; value: string | boolean } }
  | { type: 'SET_ERRORS'; payload: Partial<Record<keyof FormData, string>> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }

const initialState: FormState = {
  currentStep: 1,
  formData: { email: '', password: '', username: '', city: '', occupation: '', agreeToRules: false },
  errors: {},
  isSubmitting: false,
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.field]: action.payload.value },
        errors: { ...state.errors, [action.payload.field]: undefined },
      }
    case 'SET_ERRORS': return { ...state, errors: action.payload }
    case 'NEXT_STEP': return { ...state, currentStep: state.currentStep + 1, errors: {} }
    case 'PREV_STEP': return { ...state, currentStep: state.currentStep - 1, errors: {} }
    case 'SUBMIT_START': return { ...state, isSubmitting: true }
    case 'SUBMIT_SUCCESS': return { ...state, isSubmitting: false }
    default: return state
  }
}

function LoginPage() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } })
  }

  const handleNext = () => {
    const schemaMap = { 1: step1Schema, 2: step2Schema, 3: step3Schema }
    const schema = schemaMap[state.currentStep as keyof typeof schemaMap]

    if (schema) {
      const result = schema.safeParse(state.formData)
      if (!result.success) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {}
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof FormData
          if (!fieldErrors[field]) fieldErrors[field] = issue.message
        })
        dispatch({ type: 'SET_ERRORS', payload: fieldErrors })
        return
      }
    }

    if (state.currentStep < 3) {
      dispatch({ type: 'NEXT_STEP' })
    } else {
      dispatch({ type: 'SUBMIT_START' })
      setTimeout(() => {
        dispatch({ type: 'SUBMIT_SUCCESS' })
        login({ email: state.formData.email, name: state.formData.username })
        navigate({ to: '/catalog' })
      }, 1000)
    }
  }

  return (
    <div style={{ background: '#f9f9f9', padding: '30px', maxWidth: '400px', margin: '50px auto', borderRadius: '12px', border: '1px solid #ddd', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Регистрация (Шаг {state.currentStep} из 3)</h2>

      {state.currentStep === 1 && (
        <>
          <p>Email: <input style={{ width: '100%', marginBottom: '5px' }} value={state.formData.email} onChange={(e) => handleChange('email', e.target.value)} /></p>
          {state.errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.email}</div>}
          <p>Пароль: <input type="password" style={{ width: '100%', marginBottom: '5px' }} value={state.formData.password} onChange={(e) => handleChange('password', e.target.value)} /></p>
          {state.errors.password && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.password}</div>}
        </>
      )}

      {state.currentStep === 2 && (
        <>
          <p>Username: <input style={{ width: '100%', marginBottom: '5px' }} value={state.formData.username} onChange={(e) => handleChange('username', e.target.value)} /></p>
          {state.errors.username && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.username}</div>}
          <p>Город: <input style={{ width: '100%', marginBottom: '5px' }} value={state.formData.city} onChange={(e) => handleChange('city', e.target.value)} /></p>
          {state.errors.city && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.city}</div>}
        </>
      )}

      {state.currentStep === 3 && (
        <>
          <p>Род деятельности:
            <select style={{ width: '100%', marginBottom: '5px' }} value={state.formData.occupation} onChange={(e) => handleChange('occupation', e.target.value)}>
              <option value="">-- Выберите --</option>
              <option value="dev">Разработчик</option>
              <option value="des">Дизайнер</option>
              <option value="other">Другое</option>
            </select>
          </p>
          {state.errors.occupation && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.occupation}</div>}
          <p>
            <input type="checkbox" checked={state.formData.agreeToRules} onChange={(e) => handleChange('agreeToRules', e.target.checked)} /> Согласен с правилами
          </p>
          {state.errors.agreeToRules && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.agreeToRules}</div>}
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={() => dispatch({ type: 'PREV_STEP' })} disabled={state.currentStep === 1 || state.isSubmitting}>Назад</button>
        <button onClick={handleNext} disabled={state.isSubmitting}>
          {state.isSubmitting ? 'Отправка...' : state.currentStep === 3 ? 'Зарегистрироваться' : 'Далее'}
        </button>
      </div>
    </div>
  )
}

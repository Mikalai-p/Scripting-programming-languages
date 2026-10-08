import React, { useReducer } from 'react';
import { initialState, registrationReducer } from './registrationReducer';
import { Step1Schema, Step2Schema, Step3Schema } from './registrationSchema';
import type { IFormData } from './registrationSchema';
import styles from './RegistrationForm.module.css';

const RegistrationForm: React.FC = () => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);
  const { currentStep, formData, errors, isSubmitting } = state;

  const validateStep = (): boolean => {
    const schema = currentStep === 1 ? Step1Schema : currentStep === 2 ? Step2Schema : Step3Schema;
    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof IFormData, string>> = {};
      result.error.issues.forEach(issue => { newErrors[issue.path[0] as keyof IFormData] = issue.message; });
      Object.entries(newErrors).forEach(([field, error]) => {
        dispatch({ type: 'SET_ERROR', payload: { field: field as keyof IFormData, error: error || '' } });
      });
      return false;
    }
    return true;
  };

  const updateField = (field: keyof IFormData, value: string | boolean) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  };

  const nextStep = () => { if (validateStep()) dispatch({ type: 'NEXT_STEP' }); };
  const prevStep = () => dispatch({ type: 'PREV_STEP' });
  const submit = () => {
    if (!validateStep()) return;
    dispatch({ type: 'SUBMIT_START' });
    setTimeout(() => { console.log('Form data:', formData); alert('Registered! Check console.'); dispatch({ type: 'SUBMIT_SUCCESS' }); }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={`${styles.stepIndicator} ${currentStep >= 1 ? styles.active : ''}`}>Шаг 1: Аккаунт</div>
        <div className={`${styles.stepIndicator} ${currentStep >= 2 ? styles.active : ''}`}>Шаг 2: Профиль</div>
        <div className={`${styles.stepIndicator} ${currentStep >= 3 ? styles.active : ''}`}>Шаг 3: О себе</div>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        {currentStep === 1 && (
          <>
            <h2>Шаг 1: Аккаунт</h2>
            <div className={styles.field}><label>Email:</label><input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="example@mail.com" />{errors.email && <span className={styles.error}>{errors.email}</span>}</div>
            <div className={styles.field}><label>Пароль:</label><input type="password" value={formData.password} onChange={e => updateField('password', e.target.value)} placeholder="Минимум 8 символов" />{errors.password && <span className={styles.error}>{errors.password}</span>}</div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <h2>Шаг 2: Профиль</h2>
            <div className={styles.field}><label>Возраст:</label><input type="text" value={formData.age} onChange={e => updateField('age', e.target.value)} placeholder="Введите возраст"/>{errors.age && <span className={styles.error}>{errors.age}</span>}</div>
            <div className={styles.field}><label>Имя пользователя:</label><input type="text" value={formData.username} onChange={e => updateField('username', e.target.value)} placeholder="Введите имя" />{errors.username && <span className={styles.error}>{errors.username}</span>}</div>
            <div className={styles.field}><label>Город:</label><input type="text" value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="Введите город" />{errors.city && <span className={styles.error}>{errors.city}</span>}</div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <h2>Шаг 3: О себе</h2>
            <div className={styles.field}><label>Профессия:</label><select value={formData.occupation} onChange={e => updateField('occupation', e.target.value)}><option value="">Выберите</option><option value="developer">Разработчик</option><option value="designer">Дизайнер</option><option value="manager">Менеджер</option><option value="tester">Тестировщик</option></select>{errors.occupation && <span className={styles.error}>{errors.occupation}</span>}</div>
            <div className={styles.field}><label className={styles.checkbox}><input type="checkbox" checked={formData.agreeToTerms} onChange={e => updateField('agreeToTerms', e.target.checked)} />Я согласен с правилами</label>{errors.agreeToTerms && <span className={styles.error}>{errors.agreeToTerms}</span>}</div>
          </>
        )}
        <div className={styles.buttons}>
        
          {currentStep > 1 && <button type="button" onClick={prevStep} disabled={isSubmitting}>Назад</button>}
          {currentStep < 3 && <button type="button" onClick={nextStep} disabled={isSubmitting}>Далее</button>}
          {currentStep === 3 && <button type="button" onClick={submit} disabled={isSubmitting}>{isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}</button>}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

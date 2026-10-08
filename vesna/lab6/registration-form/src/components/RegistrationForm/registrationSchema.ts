import { z } from 'zod';

export const RegistrationSchema = z.object({
  email: z.string().email('Неверный формат email').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введите корректный email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
  username: z.string().min(1, 'Имя пользователя обязательно'),
  city: z.string().min(1, 'Город обязателен'),
  age: z.string().min(1, 'Только цифры').regex(/^\d+$/, 'Введите только цифры'),
  occupation: z.string().min(1, 'Выберите профессию'),
  agreeToTerms: z.boolean().refine(val => val === true, 'Необходимо согласиться с правилами')
});
//поле возраст, адрес
export type IFormData = z.infer<typeof RegistrationSchema>;

export const Step1Schema = RegistrationSchema.pick({ email: true, password: true });
export const Step2Schema = RegistrationSchema.pick({ age: true, username: true, city: true });
export const Step3Schema = RegistrationSchema.pick({ occupation: true, agreeToTerms: true });

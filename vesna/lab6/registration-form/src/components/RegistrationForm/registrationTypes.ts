import type { IFormData } from './registrationSchema';
export type TFormErrors = Partial<Record<keyof IFormData, string>>;

export interface IFormState {
  currentStep: 1 | 2 | 3;
  formData: IFormData;
  errors: TFormErrors;
  isSubmitting: boolean;
}

export type TFormAction =

  | { type: 'UPDATE_FIELD'; payload: { field: keyof IFormData; value: string | boolean } }
  | { type: 'SET_ERROR'; payload: { field: keyof IFormData; error: string } }
  | { type: 'CLEAR_ERROR'; payload: { field: keyof IFormData } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' };

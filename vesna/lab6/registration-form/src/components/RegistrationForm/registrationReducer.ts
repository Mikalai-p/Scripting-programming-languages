import type { IFormState, TFormAction } from './registrationTypes';
export const initialState: IFormState = {
  currentStep: 1,
  formData: {
    email: '',
    password: '',
    username: '',
    city: '',
    age:'',
    occupation: '',
    agreeToTerms: false
  },
  errors: {},
  isSubmitting: false
};

export const registrationReducer = (state: IFormState, action: TFormAction): IFormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, formData: { ...state.formData, [action.payload.field]: action.payload.value }, errors: { ...state.errors, [action.payload.field]: undefined } };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.payload.field]: action.payload.error } };
    case 'CLEAR_ERROR':
      return { ...state, errors: { ...state.errors, [action.payload.field]: undefined } };
    case 'NEXT_STEP':
      return { ...state, currentStep: (state.currentStep + 1) as 1 | 2 | 3 };
    case 'PREV_STEP':
      return { ...state, currentStep: (state.currentStep - 1) as 1 | 2 | 3 };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };
      
    default:
      return state;
  }
};

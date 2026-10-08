import React, { useState } from 'react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Badge from './components/ui/Badge';
import LayoutCard from './components/ui/LayoutCard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length < 3) {
      setInputError('Минимум 3 символа');
    } else {
      setInputError('');
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <LayoutCard
        title=" Мониторинг системы"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => alert('Отмена')}>
              Отмена
            </Button>
            <Button 
              variant="primary" 
              isLoading={isLoading}
              onClick={handleSimulateLoading}
            >
              Сохранить
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Input
            label="Имя сервера"
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
            isFullWidth
            placeholder="Введите имя сервера (мин. 3 символа)"
          />

          <div>
            <div style={{ marginBottom: '8px', fontWeight: 500 }}>Статусы узлов:</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge color="green" text="online" />
              <Badge color="orange" text="warning" />
              <Badge color="red" text="offline" />
              <Badge color="blue" text="admin" />
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '8px', fontWeight: 500 }}>Кнопки:</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" size="small">Primary Small</Button>
              <Button variant="secondary" size="medium">Secondary Medium</Button>
              <Button variant="danger" size="large">Danger Large</Button>
              <Button variant="primary" size="medium" isLoading>Загрузка...</Button>
              <Button variant="secondary" size="small" disabled>Disabled</Button>
              <Button variant="doll" size="as" disabled>Doll</Button>
            </div>
          </div>

          {inputValue && !inputError && (
            <div style={{ fontSize: '14px', color: '#166534', background: '#dcfce7', padding: '8px', borderRadius: '6px' }}>
               Сервер «{inputValue}» готов к добавлению.
            </div>
          )}
        </div>
      </LayoutCard>
    </div>
  );
}

export default App;
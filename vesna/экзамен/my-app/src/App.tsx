import React, { useState } from 'react';

const SyncInputs: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} placeholder="Поле 1" />
      <input type="text" value={value} onChange={handleChange} placeholder="Поле 2" />
    </div>
  );
};

export default SyncInputs;
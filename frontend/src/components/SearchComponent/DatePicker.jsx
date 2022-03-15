import { useState } from 'react';
import { DateRangePicker } from '@mantine/dates';

export  function DatePicker() {
  const [value, setValue] = useState([
   new Date(),
   new Date(),
  ]);

  return (
    <DateRangePicker
      label="Book hotel"
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
    />
  );
}
import React, { useState } from 'react';
import { NativeSelect } from '@mantine/core';

const sdata = [
    { value: 'lax', label: 'Los Angeles' },
    { value: 'sfo', label: 'San Francisco' },
    { value: 'del', label: 'New Delhi' },
  ];
export default function LocationSelector() {
  const [data, setData] = useState(sdata);

  return (
    <NativeSelect
      data={data}
      label="Location"
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );
}
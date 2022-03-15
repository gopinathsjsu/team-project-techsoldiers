import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon,InputWrapper,Center } from '@mantine/core';

export function PersonCounter() {
  const [value, setValue] = useState(0);
  const handlers = useRef(null);
  return (
    <InputWrapper label="Persons">
      <Center>
      <Group spacing={5}>
        <ActionIcon size={36} variant="default" onClick={() => handlers.current.decrement()}>
          –
        </ActionIcon>

        <NumberInput
          hideControls
          value={value}
          onChange={(val) => setValue(val)}
          handlersRef={handlers}
          max={10}
          min={1}
          step={1}
          styles={{ input: { width: 54, textAlign: 'center' } }}
        />

        <ActionIcon size={36} variant="default" onClick={() => handlers.current.increment()}>
          +
        </ActionIcon>
      </Group>
      </Center>
    </InputWrapper>




  );
}

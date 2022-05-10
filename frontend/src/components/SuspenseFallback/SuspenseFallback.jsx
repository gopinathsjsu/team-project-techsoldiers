import React from 'react';
import { LoadingOverlay } from '@mantine/core';

export const SuspenseFallback =  () => {
return (
    <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'pink', variant: 'bars' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible={true}
    />
)
}
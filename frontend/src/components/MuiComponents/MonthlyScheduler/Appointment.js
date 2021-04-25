import React from 'react';
import { useRouter } from 'next/router';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

export const Appointment = ({ children, style, ...restProps }) => {
  const router = useRouter()
  const onClick = ({ data }) => {
    router.push(`/order/${data.id}`)
    console.log('data', data.id)
  }
  return (
    <Appointments.Appointment
      {...restProps}
      onClick={onClick}
    >
      {children}
    </Appointments.Appointment>
  );
}

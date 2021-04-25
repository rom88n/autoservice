import React, { useEffect } from 'react';
import {
  Appointments,
  DateNavigator,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getSchedulerData, clearScheduler } from 'redux/modules';

import { Appointment } from './Appointment';

export const MonthlyScheduler = () => {
  const dispatch = useDispatch();
  const scheduler = useSelector(store => store.scheduler)

  useEffect(() => {
    const now = {
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD')
    }
    dispatch(getSchedulerData(now));

    return () => {
      dispatch(clearScheduler())
    }
  }, []);

  const onChange = (date) => {
    const startDate = moment(date).startOf('month').toDate();
    const endDate = moment(date).endOf('month').toDate();

    dispatch(getSchedulerData({
      startDate,
      endDate
    }))
  }

  if (!scheduler.data) return false

  return (
    <Scheduler
      locale="ru-RU"
      data={scheduler.data}
    >
      <ViewState
        onCurrentDateChange={onChange}
        defaultCurrentDate={moment().format('YYYY-MM-DD')}
      />
      <MonthView/>
      <Toolbar/>
      <DateNavigator/>
      <TodayButton
        messages={{
          today: 'Сегодня'
        }}
      />
      <Appointments
        appointmentComponent={Appointment}
      />
    </Scheduler>
  );
};

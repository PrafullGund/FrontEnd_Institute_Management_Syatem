import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: { color: 'info', text: 'NEW' }
  },
  { name: 'Components', title: true },

  { name: 'User', iconComponent: { name: 'cil-user' }, url: '/user' },
  { name: 'Role', iconComponent: { name: 'cil-drop' }, url: '/role' },
  { name: 'Activities', iconComponent: { name: 'cil-chart-pie' }, url: '/activities' },
  { name: 'Admission', iconComponent: { name: 'cil-pencil' }, url: '/admission' },
  { name: 'Course', iconComponent: { name: 'cil-speech' }, url: '/course' },
  { name: 'Enquiries', iconComponent: { name: 'cil-puzzle' }, url: '/enquiries' },
  { name: 'Features', iconComponent: { name: 'cil-notes' }, url: '/features' },
  { name: 'FeePayment', iconComponent: { name: 'cil-cursor' }, url: '/fee-payment' },
  { name: 'Subject', iconComponent: { name: 'cil-save' }, url: '/subject' },
  { name: 'Syllabus', iconComponent: { name: 'cil-star' }, url: '/syllabus' },
  { name: 'TimeTable', iconComponent: { name: 'cil-spreadsheet' }, url: '/timetable' },
 
  // { name: 'Widgets', url: '/widgets', iconComponent: { name: 'cil-calculator' }, badge: { color: 'info', text: 'NEW' } },
];

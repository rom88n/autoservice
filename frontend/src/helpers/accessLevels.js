export const accessOptions = [
  { value: 'superAdmin', label: 'Супер Администратор' },
  { value: 'admin', label: 'Администратор' },
  { value: 'user', label: 'Сотрудник' }
];

export const accessLevels = accessOptions.map(i => i.value);

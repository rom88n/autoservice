const accessOptions = [
  { value: 'superAdmin', label: 'Супер Администратор' },
  { value: 'admin', label: 'Администратор' },
  { value: 'user', label: 'Сотрудник' },
]

const accessLevels = accessOptions.map(i => i.value)

module.exports = { accessOptions, accessLevels };

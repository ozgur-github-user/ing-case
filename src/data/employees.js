const departments = ['Analytics', 'Tech'];
const positions = ['Junior', 'Medior', 'Senior'];

const data = [];

for (let i = 1; i <= 100; i++) {
  const firstName = `User${i}`;
  const lastName =  `Test${i}`;
  const department = departments[i % departments.length];
  const position = positions[i % positions.length];

  data.push({
    id: i,
    first_name: firstName,
    last_name: lastName,
    date_of_employment: '01/01/1990',
    date_of_birth: '01/01/1990',
    phone: '(+90) 111-11-11',
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    department: department,
    position: position,
  });
}

export default data;

db = db.getSiblingDB('autoservice-app');

db.createUser(
  {
    user: 'serviceuser',
    pwd: '12345678',
    roles: [{ role: 'readWrite', db: 'autoservice-app' }],
  },
);

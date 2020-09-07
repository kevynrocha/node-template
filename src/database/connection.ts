import { Sequelize } from 'sequelize';

const connection = new Sequelize(
  'postgres://kipbqlix:QG6F5zzN0ti_iUY6XDujpJwf1D21mNqn@tuffi.db.elephantsql.com:5432/kipbqlix',
  {
    define: {
      underscored: true,
      timestamps: true,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  },
);
// ''
export default connection;

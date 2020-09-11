import { DataTypes, UUIDV4, Model, Optional } from 'sequelize';
import connection from '../database/connection';

export interface IUserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

type UserCreationAttributes = Optional<IUserAttributes, 'id'>;

interface UserInstance
  extends Model<IUserAttributes, UserCreationAttributes>,
    IUserAttributes {}

const UserModel = connection.define<UserInstance>('users', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserModel;

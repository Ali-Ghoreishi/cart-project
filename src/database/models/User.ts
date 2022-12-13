import bcrypt from "bcryptjs"
import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';

import { sequelize } from '../configs/connection';
import { Cart } from './Cart';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare fullname: string;
    declare email: string;
    declare password: string;
    declare created_At: number;
    declare updated_At: number;
}


User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,    
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 25],                                       
                    msg: "Fullname must be at least 4 characters and at most 24 characters"
                },
                notEmpty: {
                    msg: "Fullname should not be empty"
                },
                notNull: {
                    msg: 'Please enter fullname'
                },
                is: {
                    args: [/^[A-Za-z0-9]*$/],                        
                    msg: "Please enter a valid fullname"
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 30],                                  
                    msg: "Email must be at least 10 characters"
                },
                isEmail: {
                    msg: "Please enter a valid email"
                },
                notEmpty: {
                    msg: "Email should not be empty"
                },
                notNull: {
                    msg: 'Please enter email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 20],                                     
                    msg: "Password must be at least 10 characters and at most 20 characters"
                },
                notEmpty: {
                    msg: "Password should not be empty"
                },
                notNull: {
                    msg: 'Please enter password'
                },
                is: {
                    args: [/^[A-Za-z0-9]*$/],                       
                    msg: "Please enter a valid password"
                },
            }
        },
        created_At: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        updated_At: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'users',
        sequelize
    }
);


//! Relation between Cart and User tables
User.hasOne(Cart, {
    // sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'user_cart'
});
//! End


// Hooks
User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then((hash: any) => {
            user.password = hash;
        })
        .catch((err: any) => {
            throw new Error();
        });
});


export { User }
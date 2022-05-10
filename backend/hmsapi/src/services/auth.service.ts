import { AuthConfig } from '../config/auth.config';
import { Inject, Injectable } from '@nestjs/common';
import { User, Prisma, Customer } from '.prisma/client';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { CustomerService } from './customer.service';


@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(private readonly authConfig: AuthConfig, private readonly userService: UserService, private readonly custService: CustomerService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  confirmRegistration(confirmUser: { code: string; email: string }) {
    const { code, email } = confirmUser;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };


    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          reject(err);
        } else {
          if (result == 'SUCCESS') {
            const data = { status: 'success' };

            try {

              // fetch the user details in db
              const user = this.userService.userByEmail({
                where: {
                  email: email
                }
              });

              console.log(user);

              // saving the customer details in db
              const customer = this.custService.createCustomer({
                rewards: 100,
                user: {
                  connect: { id: Number(user.id) },
                },
              });

              console.log(customer);

            } catch {

              console.log("Error while adding customer details");
            }

            resolve(data);
          }
        }
      });
    });
  }

  registerUser(newUser: {
    email: string;
    password: string;
    name: string;
  }) {
    const { email, password, name } =
      newUser;
    const data = {};



    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: name }),
          new CognitoUserAttribute({
            Name: 'updated_at',
            Value: Date.now().toString(),
          }),
        ],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          } else {
            const data = {

              username: result.user.getUsername(),
              userConfirmation: result.userConfirmed,
              status: 'success',
            };

            // saving the user details in db
            const user = this.userService.createUser({
              email,
              name,
              phone: '6693020897'
            });

            resolve(data);

          }
        },
      );
    });
  }

  authenticateUser(user: { email: string; password: string }) {
    const { email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          // Tried destructing the data but was not needed for this api. 
          //const data = { token: { jwtToken: result.getIdToken().getJwtToken(), refreshToken: result.getRefreshToken().getToken(), accessToken: result.getAccessToken().getJwtToken() } }
          resolve(result);
        },
        onFailure: (err) => {
          if (err.code === "UserNotConfirmedException") {
            newUser.getAttributeVerificationCode(email, {
              onSuccess: function (success: string): void {
                resolve(success);
              },
              onFailure: function (err: Error): void {
                reject(err);
              }
            })
          } else { reject(err) }

        }
        ,
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          newUser.completeNewPasswordChallenge(
            'Admin@1234@raj',
            requiredAttributes,
            {
              onSuccess: (result) => {
                resolve(result);
              },
              onFailure: (err) => {
                reject(err);
              },
            },
          );
        },
      });
    });
  }
}

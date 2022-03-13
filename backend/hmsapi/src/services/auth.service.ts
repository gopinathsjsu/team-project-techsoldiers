import { AuthConfig } from '../config/auth.config';
import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    private readonly authConfig: AuthConfig,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  confirmRegistration(confirmUser: { code: string; email: string; }) {
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
          resolve(result);
        }
      });
    });
  }

  registerUser(newUser: {
    email: string;
    password: string;
    given_name: string;
    family_name: string;
    birthdate: string;
    gender: string;
  }) {
    const { email, password, given_name, birthdate, gender, family_name } =
      newUser;
    const data = {};
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'given_name', Value: given_name }),
          new CognitoUserAttribute({ Name: 'family_name', Value: family_name }),
          new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }),
          new CognitoUserAttribute({ Name: 'gender', Value: gender }),
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
            
            const data = { username: result.user.getUsername(), userConfirmation: result.userConfirmed, status: "success" }
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
          resolve(result);
        },
        onFailure: (err) => {
          console.log(err);
          reject(err);
        },
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

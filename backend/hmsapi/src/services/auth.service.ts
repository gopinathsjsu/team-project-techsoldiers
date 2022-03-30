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
  constructor(private readonly authConfig: AuthConfig) {
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

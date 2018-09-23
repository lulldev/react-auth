import * as React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import DynamicForm from '../components/DynamicForm';


class Login extends React.Component<any, any> {
  public render() {

    const fieldsArr = [
      {
        'type': 'text',
        'id': 'authentication_login',
        'disabled': false,
        'label': 'Электронная почта или телефон',
        'required': true,
        'name': 'login',
      },
      {
        'type': 'password',
        'id': 'authentication_password',
        'full_name': 'authentication[password]',
        'disabled': false,
        'label': 'Пароль',
        'required': true,
        'name': 'password',
      }
    ];

    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <CardBody>
            <DynamicForm
              id="authentication"
              fields={fieldsArr}
              submitAction={() => {
                console.log('call redux action')
              }}
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;

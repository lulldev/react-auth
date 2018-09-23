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
    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <CardBody>
            <DynamicForm
              fields={[{}]}
              onSubmit={() => {
                console.log('test')
              }}
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;

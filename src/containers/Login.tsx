import * as React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Button,
} from 'reactstrap';
import {Redirect} from 'react-router'
import {connect} from 'react-redux';
import {login} from '../actions/login';
import {loadAuthForm} from '../actions/loadAuthForm';
import DynamicForm from '../components/DynamicForm';


class Login extends React.Component<any, any> {

  private static formId = 'authentication';

  constructor(props: any) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  public render() {
    const fields: any[] = [];

    if (this.props.formData) {
      const authFormData = this.props.formData[Login.formId];
      console.log(authFormData);
      if (authFormData.hasOwnProperty('children') && Array.isArray(authFormData.children)) {
        authFormData.children.forEach((receivedField: any) => {
          fields.push({
            type: receivedField.input_type,
            id: receivedField.id,
            disabled: receivedField.disabled,
            label: receivedField.label,
            required: receivedField.required,
            name: receivedField.short_name,
          });
        });
      } 
      else {
        throw new Error('Error loading form from endpoint!');
      }
    }

    if (this.props.userId) {
      return <Redirect to="/profile" />
    }

    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <CardBody>
            {this.props.isLoginFail && 
              <Alert color="danger">Неверный логин/пароль<br/><br/>
              <Button size="sm" onClick={() => this.props.loadAuthForm()}>Попробовать еще раз</Button></Alert>}
            <DynamicForm
              id="authentication"
              fields={fields}
              submitAction={this.submitHandler}
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
  
  public componentWillMount(): void {
    this.props.loadAuthForm();
  }

  protected submitHandler(requestData: any) {
    this.props.login(requestData);
  }
}

function mapStateToProps(state: any) {  
  return {
    formData: state.login.formData,
    isLoginFail: state.login.isLoginFail,
    userId: state.login.userId,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadAuthForm: () => loadAuthForm(dispatch),
    login: (requestData: any) => login(dispatch, requestData),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

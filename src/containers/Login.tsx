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
import {loadAuthForm, login} from '../actions/auth';
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
    formData: state.auth.formData,
    isLoginFail: state.auth.isLoginFail,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadAuthForm: () => loadAuthForm(dispatch),
    login: (requestData: any) => login(dispatch, requestData),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

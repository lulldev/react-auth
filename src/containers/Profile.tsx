import * as React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
} from 'reactstrap';
import {Redirect} from 'react-router'
import {connect} from 'react-redux';


class Profile extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    if (!this.props.userId) {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Profile</h1>
          </CardHeader>
          <CardBody>
            User id is: {this.props.userId}<br/>
            <Button size="sm" onClick={}>logout</Button>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state: any) {  
  return {
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // loadAuthForm: () => loadAuthForm(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

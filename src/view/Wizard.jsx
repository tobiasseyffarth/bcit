import { Steps } from 'primereact/steps';
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImportModels from './1_import/ImportModels';
import ProcIT from './2_connect/ProcIT';
import ProcCompliance from './2_connect/ProcCompliance';
import ComplianceCompliance from './2_connect/ComplianceCompliance';
import ITCompliance from './2_connect/ITCompliance';
import Rule from './3_rule/Rule';
import Alternatives from './4_alternatives/Alternatives';
import Analyze from './5_analyze/Analyze';

export default class ConnectWizard extends Component {
  state = {
    // name: 'zeugnis',
  };

  items = [
    { label: 'Import Models' },
    { label: 'Compliance/Compliance' },
    { label: 'Process/IT' },
    { label: 'Process/Compliance' },
    { label: 'IT/Compliance' },
    { label: 'Compliance Rules' },
    { label: 'Alternatives' },
    { label: 'Analyze' },
  ];

  render() {
    return (
      <div>
        <Steps
          model={this.items}
          activeIndex={this.state.activeIndex}
          readOnly={false}
          onSelect={(e) => {
                this.setState({ activeIndex: e.index });
                switch (e.index) {
                  case 0:
                    this.props.history.push('/import');
                    break;
                  case 1:
                    this.props.history.push('/ComplianceCompliance');
                    break;
                  case 2:
                    this.props.history.push('/ProcIT');
                    break;
                  case 3:
                    this.props.history.push('/ProcCompliance');
                    break;
                  case 4:
                    this.props.history.push('/ITCompliance');
                    break;
                  case 5:
                    this.props.history.push('/rule');
                    break;
                  case 6:
                    this.props.history.push('/alternatives');
                    break;
                  case 7:
                    this.props.history.push('/analyze');
                    break;
                  default:
                    this.props.history.push('/import');
                    break;
                }
              }}
        />
        <Switch>
          <Redirect from="/" exact to="/import" />
          <Route path="/import" component={ImportModels} />
          <Route path="/ComplianceCompliance" component={ComplianceCompliance} />
          <Route path="/ProcIT" component={ProcIT} />
          <Route path="/ProcCompliance" component={ProcCompliance} />
          <Route path="/ITCompliance" component={ITCompliance} />
          <Route path="/rule" component={Rule} />
          <Route path="/alternatives" component={Alternatives} />
          <Route path="/analyze" component={Analyze} />
        </Switch>
      </div>
    );
  }
}

ConnectWizard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

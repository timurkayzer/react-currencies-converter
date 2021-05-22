import React from 'react';
import CurrenciesConverter from "./CurrenciesConverter";
import { Row, Container } from 'react-bootstrap';



class App extends React.Component {
	render() {
		return <div className="wrapper">
			<Container>
				<Row>
					<CurrenciesConverter/>
				</Row>
			</Container>
		</div>;
	}
}

export default App;

import React from 'react';
import axios from 'axios';
import {FIXER_API_KEY} from './config';

class CurrenciesConverter extends React.Component {

	constructor(props) {
		super(props);

		this.fromCurrencyRef = React.createRef();
		this.toCurrencyRef = React.createRef();
		this.fromAmountRef = React.createRef();
		this.toAmountRef = React.createRef();

		this.calculate = this.calculate.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = {
			currencyRates:null,
			fromCurrency:'USD',
			fromAmount:0,
			toCurrency:'UZS',
			toAmount:0,
		};
	}

	async componentDidMount() {
		let state = this.state;
		state.currencyRates = await this.getCurrencyRates()
		state.fromCurrency = state.currencyRates.base;
		this.setState(state);
	}

	async getCurrencyRates(){
		let apiKey = FIXER_API_KEY;

		let apiUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

		let results = await axios.get(apiUrl);

		if(results){
			return results.data;
		}
	}

	calculate(event){

		let multiplier = this.calculateMultiplier(this.fromCurrencyRef.current.value,this.toCurrencyRef.current.value,this.state.currencyRates);


		this.setState({
			currencyRates: this.state.currencyRates,
			fromCurrency: this.fromCurrencyRef.current.value,
			fromAmount: this.fromAmountRef.current.value,
			toCurrency: this.toCurrencyRef.current.value,
			toAmount: (Number.parseInt(this.fromAmountRef.current.value) * multiplier).toFixed(2),
		});

		console.log(this.state)

		//this.render();
	}

	calculateMultiplier(fromCurrency, toCurrency, currencies) {
		return currencies.rates[toCurrency]/currencies.rates[fromCurrency];
	}

	render() {
	
		let options = this.state.currencyRates ? Object.keys(this.state.currencyRates.rates).map((elem) => <option value={elem}>{elem}</option>) : []

		return <div className="currencies-converter mt-5">
			<div className="container">
				<div className="row">
					<div className="col-12 mb-5">
						<h1>Currencies converter</h1>
					</div>
					<div className="col-12 col-sm-6">
						<div className="input-group">
							<input type="text" 
							className="form-control" 
							aria-label="Text input with dropdown button" 
							ref={this.fromAmountRef}
							value={this.state.fromAmount}
							onChange={this.calculate}/>
							<div className="input-group-append">
								<select className="form-control" 
								onChange={this.calculate}
								ref={this.fromCurrencyRef}
								value={this.state.fromCurrency}
								>
									{options}
								</select>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6">
						<div className="input-group">
							<input type="text" 
							className="form-control" 
							aria-label="Text input with dropdown button" 
							ref={this.toAmountRef}
							value={this.state.toAmount}
							onChange={this.calculate}/>
							<div className="input-group-append">
								<select className="form-control" 
								onChange={this.calculate}
								ref={this.toCurrencyRef}
								value={this.state.toCurrency}
								>
									{options}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default CurrenciesConverter;

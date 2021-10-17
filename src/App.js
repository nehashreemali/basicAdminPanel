import React, { Component } from "react";
import axios from "axios";
import icon from "./img/search.svg";
import loader from "./img/preloader.gif";
export default class App extends Component {
	constructor() {
		super();
		this.state = {
			url: [],
			detail: [],
			selected: "",
			value: [],
		};
	}
	async componentDidMount() {
		let response = await axios.get(
			"http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D%27"
		);
		this.setState({
			url: response.data,
		});
		this.setState({
			value: this.state.url,
		});
	}
	handelClick = (data) => {
		console.log(data.address.city);

		this.setState({
			detail: data,
			selected: data.id,
		});
	};
	handelChange = (e) => {
		let filter = this.state.url.filter((data) => {
			return data.firstName
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});
		this.setState({
			value: filter,
		});
	};
	render() {
		{
			// console.log(this.state.url);
			console.log(this.state.detail.address);
		}

		return (
			<div>
				<div id="overlay">
					<img src={icon} alt="Preloader icon" />
				</div>

				<main>
					<div id="table-section">
						<form action="/">
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="search"
								class="svg-inline--fa fa-search fa-w-16"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path
									fill="currentColor"
									d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
								></path>
							</svg>

							<input
								type="text"
								placeholder="Enter something"
								name="search-box"
								id="search-box"
								onChange={(e) => this.handelChange(e)}
							/>
						</form>

						<div id="table-wrapper">
							<div id="table-headers">
								<table>
									<thead>
										<tr>
											<th className="column1">Id</th>
											<th className="column2">FirstName</th>
											<th className="column3">LastName</th>
											<th className="column4">Email</th>
											<th className="column5">Phone</th>
										</tr>
									</thead>
								</table>
							</div>

							<div id="table-data">
								<table>
									<tbody>
										{this.state.value.map((data) => {
											return (
												<>
													<tr
														className={
															this.state.selected === data.id
																? "data-row data-rowBG"
																: "data-row"
														}
														key={data.id}
														onClick={() => this.handelClick(data)}
													>
														<td className="column1">{data.id}</td>
														<td className="column2">{data.firstName}</td>
														<td className="column3">{data.lastName}</td>
														<td className="column4">{data.email}</td>
														<td className="column5">{data.phone}</td>
													</tr>
												</>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div id="info-wrapper">
						<h1>Details</h1>
						<p>Click on a table item to get detailed information</p>

						{this.state.detail.id ? (
							<>
								{" "}
								<div>
									<div id="show">
										<div>
											<b>User selected:</b> {this.state.detail.firstName}
										</div>
										<div>
											<b>Description: </b>
											<textarea cols="50" rows="5" readonly>
												{this.state.detail.description}
											</textarea>
										</div>
										<b>Address:</b> {this.state.detail.address.city}{" "}
									</div>

									<div>
										<b>City:</b> {this.state.detail.address.city}
									</div>
									<div>
										<b>State:</b> {this.state.detail.address.state}
									</div>
									<div>
										<b>Zip:</b> {this.state.detail.address.zip}
									</div>
								</div>
							</>
						) : (
							<div>
								<div id="info-content">
									<div>
										<b>User selected:</b>
									</div>
									<div>
										<b>Description: </b>
										<textarea cols="50" rows="5" readonly></textarea>
									</div>
									<b>Address:</b>

									<div>
										<b>City:</b>
									</div>
									<div>
										<b>State:</b>
									</div>
									<div>
										<b>Zip:</b>
									</div>
								</div>
							</div>
						)}
					</div>
				</main>
			</div>
		);
	}
}

import React, { Component } from "react";
import "./App.css";

import Constants from "./constants/Card";
import Card from "./components/Cards";
import CreditCardForm from "./components/CreditCardForm";

export interface IProps {}

interface Card {
  name: string;
  cardNumber: number;
  limit: number;
}
interface IState {
  cards: Card[];
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cards: []
    };
    this.getAllCreditCardList = this.getAllCreditCardList.bind(this);
  }

  componentDidMount() {
    this.getAllCreditCardList();
  }

  getAllCreditCardList() {
    fetch(Constants.API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ cards: data });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="App">
        <div className="parentDiv">
          <h2>Credit Card System</h2>
          <h4 className="addDiv"> Add</h4>
          <CreditCardForm refreshCallback={this.getAllCreditCardList} />
          <div></div>
          <h4 className="existingDiv">Existing Cards</h4>
          <Card cards={cards} />
        </div>
      </div>
    );
  }
}

export default App;

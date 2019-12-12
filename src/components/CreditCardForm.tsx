import * as React from "react";
import CardConstant from "../constants/Card";

interface CreditCardFormProps {
  refreshCallback: Function;
}

interface CreditCardFormState {
  name: string;
  cardNumber: number;
  limit: number;
  submitSuccess: boolean;
  errorVisible: boolean;
  message: string;
}

export default class CreditCardForm extends React.Component<
  CreditCardFormProps,
  CreditCardFormState
> {
  static defaultProps = {
    name: "string",
    cardNumber: "number",
    limit: 0,
    refreshCallback: () => {}
  };

  state = {
    name: "",
    cardNumber: 0,
    limit: 0,
    errorVisible: false,
    message: "",
    submitSuccess: false
  };

  checkValidation() {
    const { cardNumber, name, limit } = this.state;
    console.log(cardNumber, "  " + limit, "   " + name);
    if (name.length === 0) {
      this.setState({ errorVisible: true, message: CardConstant.INVALID_NAME });
      return false;
    }
    if (cardNumber.toString().length !== 10) {
      this.setState({ errorVisible: true, message: CardConstant.INVALID_CARD });

      return false;
    }
    if (limit < 0) {
      this.setState({
        errorVisible: true,
        message: CardConstant.INVALID_LIMIT
      });
      return false;
    }
    return true;
  }

  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (this.checkValidation()) {
      console.log("validation success");
      this.setState({
        errorVisible: false
      });
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
    }
  };

  private async submitForm(): Promise<boolean> {
    const { cardNumber, name, limit } = this.state;
    const data = {
      name: name,
      cardNumber: cardNumber.toString(),
      limit: limit
    };
    fetch(CardConstant.API_URL, {
      headers: new Headers({ "content-type": "application/json" }),
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 1) {
          this.setState({
            errorVisible: false,
            message: data.message,
            limit: 0
          });
          this.props.refreshCallback();
        } else {
          this.setState({ errorVisible: true, message: data.message });
        }
      })
      .catch(e => console.log(e));
    return true;
  }

  render() {
    const { message, errorVisible } = this.state;

    return (
      <div>
        <form id="form1" onSubmit={this.handleSubmit} noValidate={true}>
          <div className="inputDiv">
            <label className="label">Name</label>
            <br />
            <input
              type="text"
              className="input"
              id="name"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.setState({
                  name: (e.target as HTMLInputElement).value
                })
              }
            />
          </div>
          <div className="inputDiv">
            <label className="label">Card Number</label>
            <br />
            <input
              type="number"
              className="input"
              id="cardNumber"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.setState({
                  cardNumber: +(e.target as HTMLInputElement).value
                })
              }
            />
          </div>
          <div className="inputDiv">
            <label className="label">Limit</label>
            <br />
            <input
              type="number"
              className="input"
              id="limit"
              min="0"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.setState({
                  limit: +(e.target as HTMLInputElement).value
                })
              }
            />
          </div>
          <button type="submit" className="button">
            Add
          </button>
        </form>
        {errorVisible ? <h4 className="errorDiv"> {message}</h4> : null}
      </div>
    );
  }
}

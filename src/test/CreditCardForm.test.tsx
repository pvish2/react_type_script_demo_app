import React from "react";
import ReactDOM from "react-dom";
import CreditCardForm from "../components/CreditCardForm";
import { shallow } from "enzyme";
import Constants from "../constants/Card";

describe("Credit Card Form", () => {
  let component = "";

  beforeAll(() => {
    component = shallow(<CreditCardForm />);
  });
  it("should render form", () => {
    expect(component.getElements()).toMatchSnapshot();
  });

  it("should show error on invalid card", () => {
    component.setState({ name: "bar", cardNumber: "765757577", limit: 12 });
    component.instance().checkValidation();
    expect(component.state().errorVisible).toEqual(true);
    expect(component.state().message).toEqual(Constants.INVALID_CARD);
  });

  it("should show error on invalid limit", () => {
    component.setState({ name: "bar", cardNumber: "0437093859", limit: -12 });

    component.instance().checkValidation();
    expect(component.state().errorVisible).toEqual(true);
    expect(component.state().message).toEqual(Constants.INVALID_LIMIT);
  });
});

import React from "react";
import App from "../App";
import { shallow } from "enzyme";
import Constants from "../constants/Card";

describe("App", () => {
  let component = "";

  beforeAll(() => {
    component = shallow(<App />);
  });

  it("should render my app", () => {
    expect(component.getElements()).toMatchSnapshot();
  });

  it("fetches data from server when server returns a successful response", done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    shallow(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(Constants.API_URL);

    process.nextTick(() => {
      expect(component.state()).toEqual({
        cards: []
      });
      global.fetch.mockClear();
      done();
    });
  });
});

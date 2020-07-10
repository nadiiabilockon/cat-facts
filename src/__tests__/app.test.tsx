import React from "react";
import App from "../App";
import { render } from '@testing-library/react';

//emulate api call during 1500 msec
jest.mock('../api/cat-fact-service', () => ({
  getFacts: () => new Promise((resolve, reject) => {
    setTimeout(() => resolve(undefined), 1500)
  })
}));

describe('call fetch facts function when page load', () => {
  it("fetch was called", () => {

    let catFactService = require('../api/cat-fact-service');

    catFactService = jest.spyOn(catFactService, "getFacts");

    render(<App />);

    expect(catFactService).toHaveBeenCalledTimes(1)
  });
});

describe('test button state during api call', () => {

  test("button is disabled until api response", done => {

    const { getByTestId } = render(<App />);

    setTimeout(() => {
      expect(getByTestId(/fetch-btn/i).closest('button')).toBeDisabled();
      done();
    }, 1000)
  });

  test("button is enabled after api response", done => {

    const { getByTestId } = render(<App />);

    setTimeout(() => {
      expect(getByTestId(/fetch-btn/i).closest('button')).toBeEnabled();
      done();
    }, 2000)
  });
})

describe('test loader', () => {

  test("loader is active until api response", done => {

    const { getByTestId } = render(<App />);

    setTimeout(() => {
      expect(getByTestId(/loader/i)).toBeTruthy();
      done();
    }, 1000)
  });

  test("loader is not active after api response", done => {

    const { queryByTestId } = render(<App />);

    setTimeout(() => {
      const loader = queryByTestId(/loader/i);
      expect(loader).toBeNull();
      done();
    }, 2000)
  });
});


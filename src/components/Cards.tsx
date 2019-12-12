import React from "react";

const Cards = ({ cards }) => {
  return (
    <div>
      <table className="StandardTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Card Number</th>
            <th>balance</th>
            <th>Limit</th>
          </tr>
        </thead>
        <tbody>
          {cards.length > 0 ? (
            cards.map((card, index) => {
              return (
                <tr key={index}>
                  <td> {card.name}</td>
                  <td>{card.cardNumber}</td>
                  <td>{"£" + card.balance}</td>
                  <td>{"£" + card.limit}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cards;

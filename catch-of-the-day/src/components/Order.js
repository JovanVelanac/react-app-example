import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish;

    if (!fish) return null;

    return (
      <li key={key}>
        {count} x {fish.name} {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish;

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className={this.props.cartVisibility ? "order-wrap visible" : "order-wrap"} >
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;

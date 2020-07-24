import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import _ from "lodash"

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
    cartVisibility: false,
    accountVisibility: false,
  };

  componentDidMount() {
    const { params } = this.props.match;

    //first resinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  updateCartView = () => {
    this.setState({
      cartVisibility: !this.state.cartVisibility
    });
  }

  updateAccountView = () => {
    this.setState({
      accountVisibility: !this.state.accountVisibility
    });
  }

  addFish = (fish) => {
    // console.log(fish);
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object into the state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };

    // 2. update that state

    fishes[key] = updatedFish;

    // 3. set the updated fish into state
    this.setState({
      fishes,
    });
  };



  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };

    // 2. update the state
    fishes[key] = null;

    // 3. update the state

    this.setState({ fishes });
  };

  addToOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;

    // 3. call setState to update our state object with the order
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };

    // 2. remove that item from the order
    delete order[key];

    // 3. call setState to update our state object with the order
    this.setState({ order });
  };
  
  render() {
    return (
      <div className={"catch-of-the-day " + this.state.layout}>
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <button onClick={this.updateCartView} className={this.state.cartVisibility ? "cartbtn clicked" : "cartbtn"}></button>
          <button onClick={this.updateAccountView} className={this.state.accountVisibility ? "accountbtn clicked" : "accountbtn"}></button>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          cartVisibility={this.state.cartVisibility}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fish={this.state.fishes}
          storeId={this.props.match.params.storeId}
          accountVisibility={this.state.accountVisibility}
        />
      </div>
    );
  }
}

export default App;

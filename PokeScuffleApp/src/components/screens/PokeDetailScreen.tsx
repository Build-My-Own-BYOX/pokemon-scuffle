import React, { Component } from "react";
import { SafeAreaView } from "react-native";

interface State {}

class PokeDetailScreen extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <h1>Hello there</h1>
      </SafeAreaView>
    );
  }
}

export default PokeDetailScreen;

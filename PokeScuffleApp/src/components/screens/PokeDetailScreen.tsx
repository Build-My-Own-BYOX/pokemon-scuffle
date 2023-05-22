import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";

interface State {}

class PokeDetailScreen extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Hello there</Text>
      </SafeAreaView>
    );
  }
}

export default PokeDetailScreen;

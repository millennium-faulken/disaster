import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { Amplify, Auth } from "aws-amplify";
import config from "./src/aws-exports";

Amplify.configure(config);

function App() {
	// Auth.signOut();
	return (
		<SafeAreaView style={styles.container}>
			<Navigation />
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0FbFc",
	},
});

export default App;

import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/SignUp";
import ConfirmEmail from "../screens/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/ResetPassword/ResetPassword";
import Home from "../screens/Home";
import { Auth, Hub } from "aws-amplify";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	const [user, setUser] = useState(undefined);

	const checkUser = async () => {
		try {
			const authUser = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			setUser(authUser);
		} catch (e) {
			setUser(null);
		}
	};
	useEffect(() => {
		checkUser();
	}, []);

	useEffect(() => {
		const listener = (data) => {
			if (data.payload.event === "signIn" || data.payload.event === "signOut") {
				checkUser();
			}
		};
		const cancelListen = Hub.listen("auth", listener);
		return () => cancelListen();
	}), [];

	if (user === undefined) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{user ? (
					<Stack.Screen name="Home" component={Home} />
				) : (
					<>
						<Stack.Screen name="SignIn" component={SignIn} />
						<Stack.Screen name="SignUp" component={SignUp} />
						<Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
						<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
						<Stack.Screen name="ResetPassword" component={ResetPassword} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;

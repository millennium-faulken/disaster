import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	useWindowDimensions,
	Alert,
} from "react-native";
import earth from "../../assets/images/earth.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const SignIn = () => {
	const { height } = useWindowDimensions();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSignIn = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await Auth.signIn(data.username, data.password);
			console.log(response);
		} catch (e) {
			Alert.alert("Oops", e.message);
		}
		setLoading(false);
	};

	const onSignUp = () => {
		navigation.navigate("SignUp");
	};

	const onForgotPassword = () => {
		navigation.navigate("ForgotPassword");
	};

	return (
		// <ScrollView showsVerticalScrollIndicator={false}>
		<View style={styles.container}>
			<Image
				source={earth}
				style={[styles.earth, { height: height * 0.3 }]}
				resizeMode="contain"
			/>
			<CustomInput
				name="username"
				placeholder="Username"
				control={control}
				rules={{ required: "Username is required" }}
			/>
			<CustomInput
				name="password"
				placeholder="Password"
				secureTextEntry
				control={control}
				rules={{
					required: "Password is required",
					minLength: {
						value: 8,
						message: "Password must be at least 8 characters long",
					},
				}}
			/>

			<CustomButton
				text={loading ? "Loading..." : "Sign In"}
				onPress={handleSubmit(onSignIn)}
			/>
			<CustomButton
				text={"Forgot Password?"}
				onPress={onForgotPassword}
				type="TERTIARY"
			/>

			<SocialSignInButtons />

			<CustomButton
				text={"Don't have an account? Create one"}
				onPress={onSignUp}
				type="TERTIARY"
			/>
		</View>
		// </ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	earth: {
		width: "30%",
		maxHeight: 200,
	},
});

export default SignIn;

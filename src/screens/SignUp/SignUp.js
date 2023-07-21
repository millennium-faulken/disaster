import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { Alert } from "react-native";

const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
	const { control, handleSubmit, watch } = useForm();

	const pwd = watch("password");
	const navigation = useNavigation();

	const onCreateAccount = async (data) => {
		const { username, password, email, name } = data;
		try {
			await Auth.signUp({
				username,
				password,
				attributes: { email, name },
			});
			navigation.navigate("ConfirmEmail", { username });
		} catch (e) {
			Alert.alert("Oops", e.message);
		}
	};

	const onTermsOfUse = () => {
		console.log("Terms of Use");
	};

	const onPrivacyPolicy = () => {
		console.log("Privacy Policy");
	};

	const onSignIn = () => {
		navigation.navigate("SignIn");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create an account</Text>
			<CustomInput
				name="name"
				placeholder="Full name"
				control={control}
				rules={{
					required: "Name is required",
					minLength: {
						value: 6,
						message: "Username should be at least 6 characters long",
					},
				}}
			/>

			<CustomInput
				name="username"
				placeholder="Username"
				control={control}
				rules={{
					required: "Username is required",
					minLength: {
						value: 6,
						message: "Username should be at least 6 characters long",
					},
					maxLength: {
						value: 24,
						message: "Username must be less than 24 characters long",
					},
				}}
			/>
			<CustomInput
				name="email"
				placeholder="Email"
				control={control}
				rules={{
					required: "Email is required",
					pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
				}}
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
			<CustomInput
				name="repeatPassword"
				placeholder="Repeat Password"
				secureTextEntry
				control={control}
				rules={{
					validate: (value) => value === pwd || "Passwords do not match",
				}}
			/>

			<CustomButton
				text="Create Account"
				onPress={handleSubmit(onCreateAccount)}
			/>

			<Text style={styles.text}>
				By creating an account, you confirm that you accept our{" "}
				<Text style={styles.link} onPress={onTermsOfUse}>
					Terms of Use
				</Text>{" "}
				and{" "}
				<Text style={styles.link} onPress={onPrivacyPolicy}>
					Privacy Policy
				</Text>
			</Text>

			<SocialSignInButtons />

			<CustomButton
				text={"Have an account already? Sign in"}
				onPress={onSignIn}
				type="TERTIARY"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#051c60",
		margin: 10,
	},
	text: {
		color: "grey",
		margin: 10,
	},
	link: {
		color: "#fdb075",
	},
});

export default SignUp;

import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const ConfirmEmail = () => {
	const route = useRoute();
	const { control, handleSubmit, watch } = useForm({
		defaultValues: { username: route?.params?.username },
	});

	const username = watch("username");

	const navigation = useNavigation();

	const onConfirm = async (data) => {
		try {
			await Auth.confirmSignUp(data.username, data.code);
			navigation.navigate("SignIn");
		} catch (e) {
			Alert.alert("Oops", e.message);
		}
	};

	const onResendCode = async (data) => {
		try {
			await Auth.resendSignUp(username);
			Alert.alert('Success', "Confirmation code has been sent.");
		} catch (e) {
			Alert.alert("Oops", e.message);
		}
	};

	const onSignIn = () => {
		navigation.navigate("SignIn");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Confirm Email</Text>

			<CustomInput
				name="username"
				placeholder=""
				control={control}
				rules={{ required: "Code is required" }}
			/>

			<CustomInput
				name="code"
				placeholder="Code"
				control={control}
				rules={{ required: "Code is required" }}
			/>

			<CustomButton text="Confirm" onPress={handleSubmit(onConfirm)} />

			<CustomButton
				text={"Resend Code"}
				onPress={onResendCode}
				type="SECONDARY"
			/>

			<CustomButton
				text={"Back to Sign In"}
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

export default ConfirmEmail;


import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const ForgotPassword = () => {
	const { control, handleSubmit } = useForm();
	const navigation = useNavigation();

	const onSend = async (data) => {
		try {
			await Auth.forgotPassword(data.username);
			Alert.alert("A code has been sent to your email.");
			navigation.navigate("ResetPassword");
		} catch (e) {
			Alert.alert("Oops", e.message);
		}
	};

	const onSignIn = () => {
		navigation.navigate("SignIn");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Reset Password</Text>

				<CustomInput
					name="username"
					control={control}
					placeholder="Username"
					rules={{
						required: "Username is required",
					}}
				/>

				<CustomButton text="Send" onPress={handleSubmit(onSend)} />

				<CustomButton
					text="Back to Sign in"
					onPress={onSignIn}
					type="TERTIARY"
				/>
			</View>
		</ScrollView>
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

export default ForgotPassword;

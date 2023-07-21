import React from "react";
import { Controller } from "react-hook-form";
import { View, TextInput, StyleSheet, Text } from "react-native";

const CustomInput = ({
	control,
	rules = {},
	name,
	placeholder,
	secureTextEntry = false,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error },
			}) => (
				<>
					<View
						style={[
							styles.container,
							{ borderColor: error ? "red" : "#e8e8e8" },
						]}
					>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder={placeholder}
							style={[styles.input]}
							secureTextEntry={secureTextEntry}
						/>
					</View>
					{error && (
						<Text style={{ color: "red", alignSelf: "stretch" }}>{error.message || 'Error'}</Text>
					)}
				</>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: "100%",

		borderColor: "#e8e8e8",
		borderWidth: 1,
		borderRadius: 5,

		paddingHorizontal: 10,
		marginVertical: 5,
	},
	input: {
		height: 45,
	},
});

export default CustomInput;

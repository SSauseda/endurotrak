import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [location, setLocation] = useState("");
	const [about, setAbout] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [bannerImage1, setBannerImage1] = useState("");
	const [bannerImage2, setBannerImage2] = useState("");
	const [bannerImage3, setBannerImage3] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const cities = [
		"Boston", 
		"Chicago", 
		"Dallas", 
		"Denver", 
		"Houston", 
		"Los Angeles", 
		"Miami", 
		"New York", 
		"Philadelphia", 
		"Phoenix", 
		"San Antonio", 
		"San Diego", 
		"San Francisco", 
		"Seattle"
	];

	const validateImageUrl = (url) => {
		return url === '' || url.match(/\.(jpeg|jpg|png)$/) != null;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			if (about.length < 10 || about.length > 255){
				setErrors([
					...errors, "bio must be between 10 and 255 characters."
				]);
				return;
			}
			if (!validateImageUrl(profileImage) || !validateImageUrl(bannerImage1) || !validateImageUrl(bannerImage2) || !validateImageUrl(bannerImage3)){
				setErrors([
					...errors, "Please enter a valid image url. Images must be .jpeg, .jpg, or .png."
				]);
				return;
			}
			const data = await dispatch(signUp(username, 
				email, 
				password,
				firstName,
				lastName,
				location,
				about,
				profileImage,
				bannerImage1,
				bannerImage2,
				bannerImage3,
				));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Passwords do not match. Please try again.",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input 
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input 
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Location
					<select
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						required
					>
						<option value="">--Please choose a city--</option>
						{cities.map((city, index) => (
							<option key={index} value={city}>{city}</option>
						))}
					</select>
				</label>
				<label>
					Tell us about yourself
					<input 
						type="text"
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						required
					/>
				</label>
				<label>
					Profile Image
					<input
						type="url"
						value={profileImage}
						onChange={(e) => setProfileImage(e.target.value)}
					/>
				</label>
				<label>
					Banner Image 1
					<input
						type="url"
						value={bannerImage1}
						onChange={(e) => setBannerImage1(e.target.value)}
					/>
				</label>
				<label>
					Banner Image 2
					<input
						type="url"
						value={bannerImage2}
						onChange={(e) => setBannerImage2(e.target.value)}
					/>
				</label>
				<label>
					Banner Image 3
					<input
						type="url"
						value={bannerImage3}
						onChange={(e) => setBannerImage3(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;

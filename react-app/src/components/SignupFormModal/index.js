import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [modalClass, setModalClass] = useState("modal-entering");
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

	const validateEmail = (email) => {
		const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return regex.test(email);
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
	

		const newErrors = [];
	
		if (password !== confirmPassword) {
			newErrors.push("Passwords do not match. Please try again.");
		}
	
		if (about.length < 10 || about.length > 255) {
			newErrors.push("bio must be between 10 and 255 characters.");
		}
	
		if (!validateImageUrl(profileImage) || !validateImageUrl(bannerImage1) || !validateImageUrl(bannerImage2) || !validateImageUrl(bannerImage3)) {
			newErrors.push("Please enter a valid image url. Images must be .jpeg, .jpg, or .png.");
		}

		if (!validateEmail(email)) {
			newErrors.push("Please enter a valid email address.");
		}
	
		// If there are any errors, update the state and return early
		if (newErrors.length > 0) {
			setErrors(newErrors);
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
	};


	return (
		<>
		<div className="signup-form-container">
			<h1 className="signup-header">Sign Up</h1>
			<form className="signup-form-box" onSubmit={handleSubmit}>
				<ul className="errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-label">
					Username
					<input
						className="signup-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Create a username"
					/>
				</label>
				<div className="field-group">
					<div className="field-half">
						<label className="signup-label">
							First Name
							<input 
								className="signup-input"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
								placeholder="Enter First Name"
							/>
						</label>
					</div>
					<div className="field-half">
						<label className="signup-label">
							Last Name
							<input 
								className="signup-input"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
								placeholder="Enter Last Name"
							/>
						</label>
					</div>
				</div>

				<div className="field-group">
					<div className="field-half">
						<label className="signup-label">
							Email
							<input
								className="signup-input"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Enter Email"
							/>
						</label>
					</div>
					<div className="field-half">
						<label className="signup-label">
							Location
							<select
								className="signup-select"
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
					</div>
				</div>
				<label className="signup-label">
					Tell us about yourself
					<input
						className="signup-input"
						type="text"
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						required
						placeholder="Enter a short bio"
					/>
				</label>
				<label className="signup-label">
					Profile Image 
					<div className="profile-validation">(must end in .jpeg, .jpg, or .png)</div>
					<input
						className="signup-input"
						type="text"
						value={profileImage}
						onChange={(e) => setProfileImage(e.target.value)}
						placeholder="optional"
					/>
				</label>
				<label className="signup-label">
					Banner Image 1
					<div className="profile-validation">(must end in .jpeg, .jpg, or .png)</div>
					<input
						className="signup-input"
						type="text"
						value={bannerImage1}
						onChange={(e) => setBannerImage1(e.target.value)}
						placeholder="optional"
					/>
				</label>
				<label className="signup-label">
					Banner Image 2
					<div className="profile-validation">(must end in .jpeg, .jpg, or .png)</div>
					<input
						className="signup-input"
						type="text"
						value={bannerImage2}
						onChange={(e) => setBannerImage2(e.target.value)}
						placeholder="optional"
					/>
				</label>
				<label className="signup-label">
					Banner Image 3
					<div className="profile-validation">(must end in .jpeg, .jpg, or .png)</div>
					<input
						className="signup-input"
						type="text"
						value={bannerImage3}
						onChange={(e) => setBannerImage3(e.target.value)}
						placeholder="optional"
					/>
				</label>
				<label className="signup-label">
					Password
					<input
						className="signup-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Enter Password"
					/>
				</label>
				<label className="signup-label">
					Confirm Password
					<input
						className="signup-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				<button className="signup-button" type="submit">Sign Up</button>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;

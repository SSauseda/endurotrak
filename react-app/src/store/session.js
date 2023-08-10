// constants
const SET_USER = "session/SET_USER";
export const REMOVE_USER = "session/REMOVE_USER";
const SET_USERS = "session/SET_USERS";
const SET_SINGLE_USER = "session/SET_SINGLE_USER";
// const GET_PARTICIPATING_CHALLENGES = "session/GET_PARTICIPATING_CHALLENGES";
const SET_SEARCH_RESULTS = "session/SET_SEARCH_RESULTS";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const setUsers = (users) => ({
	type: SET_USERS,
	payload: users,
});

const setSingleUser = (user) => ({
	type: SET_SINGLE_USER,
	payload: user,
});

// const getParticipatingChallenges = (challenges) => ({
// 	type: GET_PARTICIPATING_CHALLENGES,
// 	payload: challenges,
// })

const setSearchResults = (users) => ({
	type: SET_SEARCH_RESULTS,
	payload: users,
});



export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, 
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
	) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name: firstName,
			last_name: lastName,
			location,
			about,
			profile_image: profileImage,
			banner_image1: bannerImage1,
			banner_image2: bannerImage2,
			banner_image3: bannerImage3,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const fetchAllUsers = () => async (dispatch) => {
	const response = await fetch("/api/users/");

	if (response.ok) {
		const { users } = await response.json();
		dispatch(setUsers(users));
		return null;
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const fetchSingleUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`);

	if (response.ok) {
		const user  = await response.json();
		dispatch(setSingleUser(user));
		return null;
	} else {
		return ["An error occurred. Please try again."];
	}
}


export const searchUsers = (search) => async (dispatch) => {
	const response = await fetch(`/api/users/search?search=${search}`);
	console.log("HELLLOOOOOOO", response)

	if (response.ok) {
		const { users } = await response.json();
		dispatch(setSearchResults(users));
		return null;
	} else {
		return ["An error occurred. Please try again."];
	}
};


const initialState = { user: null, searchResults: [] };


export default function reducer(state = initialState, action) {
	// let newState;
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		case SET_USERS:
			return { ...state, users: action.payload };
		case SET_SINGLE_USER:
			return { ...state, singleUser: action.payload };
		case SET_SEARCH_RESULTS:
			return { ...state, searchResults: action.payload };
		default:
			return state;
	}
}

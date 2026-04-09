import { API_BASE_URL, ApiEndpoints } from '../neededAPIs/api';

export const registerUser =async(userData)=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.REGISTER}`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data =await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Registration failed');
    }
    return data;
}


export const sendOTP=async(phoneNumber)=>{
    console.log('URL:', `${API_BASE_URL}${ApiEndpoints.SEND_LOGIN_OTP}`); // 👈
    console.log('Sending OTP to:', phoneNumber);
    
    const response =await fetch(`${API_BASE_URL}${ApiEndpoints.SEND_LOGIN_OTP}`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({mobile: phoneNumber}),

    });

    const otpData= await response.json();

    if(!response.ok){
        throw new Error(otpData.message || 'Phone number not Registered');
    }
    return otpData;
}

export const verifyOTP =async(verifyData)=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.VERIFY_LOGIN_OTP}`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyData),
    });

    const otp_data =await response.json();
    console.log('Status:', response.status);
    console.log('OTP Verify Response:', otp_data);

    if(!response.ok){
        throw new Error(otp_data.message || 'Failed to verify OTP');
    }
    return otp_data;
}

export const userLogin =async(userDetails)=>{
    // const params= new URLSearchParams({type: "user"});
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.SOCIAL_LOGIN}`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            mobile:userDetails.mobile,
            login_type: "otp",
            platform: "android",
            type: "user",
        }),
    });
       
    const user_data =await response.json();
    console.log('URL:', `${API_BASE_URL}${ApiEndpoints.SOCIAL_LOGIN}`);
    console.log('Login Response:', JSON.stringify(user_data));

    if(!response.ok){
        throw new Error(user_data.message || 'Login Failed');
    }
    return user_data;
}

export const stateNames = async()=>{
   const response = await fetch(`${API_BASE_URL}${ApiEndpoints.STATE_NAMES}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }); 

    const state_names= await response.json();
    console.log('Status:', response.status);
    console.log('States Response:', state_names);

    if(!response.ok){
        throw new Error(state_names.message || 'Failed to load states ');
    }
    return state_names;
}

export const dashboardData = async(token)=>{
     console.log('Token being sent:', token);     
    console.log('URL:', `${API_BASE_URL}${ApiEndpoints.DASHBOARD_NEW}?type=user`); 
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.DASHBOARD_NEW}?type=user`, {
         method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const dashboard_data= await response.json();
    // console.log('Status:', response.status);
    console.log('Dashboard Response:', dashboard_data);

    if(!response.ok){               
        throw new Error(dashboard_data.message || 'Failed to load dashboard data');
    } 
    return dashboard_data;  


}

export const getWatchList = async(token)=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.WATCHLIST}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const watchlist_data = await response.json();
    console.log('WatchList Response:', watchlist_data);

    if(!response.ok){
        throw new Error(watchlist_data.message || 'Failed to load watchlist data');
    }
    return watchlist_data;

}

export const addToWatchList = async(token, movieId)=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.ADD_TO_WATCHLIST}?type=user`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({movie_id: movieId}),
    });
    const watchlist_data = await response.json();
    console.log('Add to WatchList Response:', watchlist_data);

    if(!response.ok){
        throw new Error(watchlist_data.message || 'Failed to add movie to watchlist');
    }
    return watchlist_data;
}

export const removeFromWatchList = async(token, movieId)=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.REMOVE_FROM_WATCHLIST}?type=user`, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({movie_id: movieId}),
    });
    const watchlist_data = await response.json();
    console.log('Remove from WatchList Response:', watchlist_data);

    if(!response.ok){
        throw new Error(watchlist_data.message || 'Failed to remove movie from watchlist');
    }
    return watchlist_data;
}

export const rentHistory = async(token)=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.RENT_HISTORY}?type=user`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const renting_data = await response.json();
    console.log('Rent History Response: ', renting_data);

    if(!response.ok){
        throw new Error(renting_data.message || 'Failed to load rent history');
    }
    return renting_data;
}

export const get_content_language = async() =>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.GET_CONTENT_LANGUAGES}?type=user`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    });
    const lang_data =await response.json();
    console.log('Content Language Response: ', lang_data);

    if(!response.ok){
        throw new Error(lang_data.message || 'Failed to load content languages');
    }
    return lang_data;    
}

export const save_user_language = async(userId, languageIds) =>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.SAVE_USER_LANGUAGES}?type=user`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId, language_ids: languageIds}),
    });

    const save_lang_data = await response.json();
    console.log('Save Content Language Response: ', save_lang_data);

    if(!response.ok){
        throw new Error(save_lang_data.message || 'Failed to save user languages');
    }
    return save_lang_data;
}

export const get_user_languages = async (userId) => {
  const response = await fetch(`${API_BASE_URL}${ApiEndpoints.GET_USER_LANGUAGES}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const get_lang_data = await response.json();
  console.log('User Languages Response:', get_lang_data);
  if (!response.ok) {
    throw new Error(get_lang_data.message || 'Failed to get user languages');
  }
  return get_lang_data;
};

export const get_search = async()=>{
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.GET_SEARCH}?type=user`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    });
    const get_search_data = await response.json();
    console.log('Search Response', get_search_data);

    if(!response.ok){
        throw new Error(get_search_data.message || 'Failed to get search data');
    }
    return get_search_data;
}

export const get_search_list = async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.SEARCH_LIST}?type=user&user_id=${userId}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const get_search_list_data = await response.json();
    console.log('Search list response', get_search_list_data);

    if(!response.ok){
        throw new Error(get_search_list_data.message || 'Failed to get search list');
    }
    return get_search_list_data;
    
}

export const save_search_data = async (token, userId, search_query, search_id=1, entertainment_type="movie") => {
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.SAVE_SEARCH}?type=user`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify({
            user_id:userId,
            search_query:search_query,
            search_id:search_id,
            entertainment_type: entertainment_type,
        })
    });
    const save_search_response = await response.json();
    console.log('Search list response', save_search_response);

    if(!response.ok){
        throw new Error(save_search_response.message || 'Failed to save search');
    }
    return save_search_response;   
}

export const checkIncomingCall = async (token) => {
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.VIDEO_CALL_INCOMING}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const incoming_call_data = await response.json();
    console.log('Incoming Call Response:', incoming_call_data);
 
    if (!response.ok) {
        throw new Error(incoming_call_data.message || 'Failed to check incoming call');
    }
    return incoming_call_data.status ? incoming_call_data.data : null;
}
 
export const acceptCall = async (token, callId) => {
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.VIDEO_CALL_ACCEPT}/${callId}/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const accept_call_data = await response.json();
    console.log('Accept Call Response:', accept_call_data);
 
    if (!response.ok) {
        throw new Error(accept_call_data.message || 'Failed to accept call');
    }
    return accept_call_data.data;
}
 
export const rejectCall = async (token, callId) => {
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.VIDEO_CALL_REJECT}/${callId}/reject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const reject_call_data = await response.json();
    console.log('Reject Call Response:', reject_call_data);
 
    if (!response.ok) {
        throw new Error(reject_call_data.message || 'Failed to reject call');
    }
    return reject_call_data;
}
 
export const endCall = async (token, callId) => {
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.VIDEO_CALL_END}/${callId}/end`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const end_call_data = await response.json();
    console.log('End Call Response:', end_call_data);
 
    if (!response.ok) {
        throw new Error(end_call_data.message || 'Failed to end call');
    }
    return end_call_data.data;
}
 
export const getUserRecordings = async (token, userId) => {
    console.log('userId value:', userId, 'type:', typeof userId);
    const response = await fetch(`${API_BASE_URL}${ApiEndpoints.USER_RECORDINGS}?user_id=${parseInt(userId, 10)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const rawText = await response.text();
    console.log('User Recordings Raw Response:', rawText);
 
    let recordings_data;
    try {
        recordings_data = JSON.parse(rawText);
    } catch (e) {
        throw new Error(`Server returned invalid JSON: ${rawText.slice(0, 100)}`);
    }
 
    console.log('User Recordings Response:', recordings_data);
 
    if (!response.ok) {
        throw new Error(recordings_data.message || 'Failed to get user recordings');
    }
    return recordings_data.status ? recordings_data.data : [];
}
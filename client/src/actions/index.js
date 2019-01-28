import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  // console.log("fetchUser is called.");
  const res = await axios.get('/api/current_user');
  // console.log(res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
}

// export const fetchUserData = (data) => {
//
//   console.log(data);
//   return {
//     type: FETCH_USER,
//     payload: data
//   };
// };
//
// export const fetchUser = () => {
//   return (dispatch) => {
//     axios
//       .get('/api/current_user')
//       .then(res => {
//         dispatch(fetchUserData(res.data))
//       })
//       .catch(error => {
//         throw(error);
//       });
//   };
// };

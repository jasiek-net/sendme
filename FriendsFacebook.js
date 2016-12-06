import { connect } from 'react-redux'
import Friends from './Friends'

const mapStateToProps = (state) => {
  return {
    friends: state.facebook.friends,
    next: state.facebook.next,
    store: state.facebook,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: id => {
      dispatch({
        type: 'FB_TOGGLE',
        id
      })
    },
    fetch: state => {
      fetchFacebook(state, dispatch)
    }
  }
}

const FriendsFacebook = connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);

export default FriendsFacebook;

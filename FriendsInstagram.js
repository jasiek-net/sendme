import { connect } from 'react-redux'
import { fetchInstagram } from './Requests'
import Friends from './Friends'

const mapStateToProps = (state) => {
  return {
    friends: state.instagram.friends,
    next: state.instagram.next,
    store: state.instagram,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: id => {
      dispatch({
        type: 'IN_TOGGLE',
        id
      })
    },
    fetch: state => {
      fetchInstagram(state, dispatch)
    }
  }
}

const FriendsInstagram = connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);

export default FriendsInstagram;

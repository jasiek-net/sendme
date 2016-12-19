'use strict'

const toggle_follows = (state, action) => {
  const index = state.indexOf(action.id);
  if (index === -1) {
    return [...state, action.id]
  } else {
    return [...state].splice(index, 1)
  }
}

const friends = (state = [], action) => {

}


const follows = (state = [], action) => {
  return {
    ...state,
    follows: action.list
  }
}

const toggle_friends = (state, action) => {
  return state.map(f => {
    if (f.id !== action.id) {
      return f;
    }

    return {
      ...f,
      add: !f.add
    }
  })
}

const toggle = (state, action) => {
  const index = state.follows.indexOf(action.id);
  if (index === -1) {
    return {
      ...state,
      friends: toggle_friends(state.friends, action),
      follows: [
        ...state.follows,
        action.id.toString()
      ],
    }
  } else {
    return {
      ...state,
      friends: toggle_friends(state.friends, action),
      follows: [
        ...state.follows.slice(0, index),
        ...state.follows.slice(index+1),
      ],
    }
  }
}

const updateFollows = (friends, follows) => {
  return friends.map(friend => ({
    ...friend,
    add: follows.indexOf(friend.id) !== -1,
  }))
}


export const facebook = (state = {}, action) => {
  switch(action.type) {

    case 'FACEBOOK_USER':
      return {
        ...state,
        view: 'logged',
        user: action.data,
      }

    case 'FACEBOOK_FRIENDS':
      return {
        ...state,
        friends: [
          ...state.friends,
          ...updateFollows(action.list, state.follows),
        ],
        next: action.next,
      }

    case 'FACEBOOK_FOLLOWS':
      return {
        ...state,
        friends: updateFollows(state.friends, action.list),
        follows: action.list,
      }

    case 'FACEBOOK_TOGGLE_FRIEND':
      var nextState = toggle(state, action);
      return nextState

    case 'FACEBOOK_LOGOUT':
      return {
        friends: [],
        follows: [],
        next: null,
        user: null,
        view: 'login',
      }

    case 'FACEBOOK_WAITING':
      return {
        ...state,
        view: 'empty',
      }

    default:
      return state;
  }
}

export const instagram = (state = {}, action) => {
  switch(action.type) {

    case 'INSTAGRAM_USER':
      return {
        ...state,
        view: 'logged',
        user: action.data,
      }

    case 'INSTAGRAM_FRIENDS':
      return {
        ...state,
        friends: [
          ...state.friends,
          ...updateFollows(action.list, state.follows),
        ],
        next: action.next,
      }

    case 'INSTAGRAM_FOLLOWS':
      return {
        ...state,
        friends: updateFollows(state.friends, action.list),
        follows: action.list,
      }

    case 'INSTAGRAM_TOGGLE_FRIEND':
      var nextState = toggle(state, action);
      return nextState

    case 'INSTAGRAM_LOGOUT':
      return {
        friends: [],
        follows: [],
        next: null,
        user: null,
        view: 'login',
      }

    case 'INSTAGRAM_WAITING':
      return {
        ...state,
        view: 'empty',
      }

    default:
      return state;
  }
}

export const gmail = (state = {}, action) => {
  switch(action.type) {

    case 'GMAIL_USER':
      return {
        ...state,
        view: 'logged',
        user: action.data,
      }

    case 'GMAIL_FRIENDS':
      return {
        ...state,
        friends: [
          ...state.friends,
          ...updateFollows(action.list, state.follows),
        ],
        next: action.next,
      }

    case 'GMAIL_FOLLOWS':
      return {
        ...state,
        friends: updateFollows(state.friends, action.list),
        follows: action.list,
      }

    case 'GMAIL_TOGGLE_FRIEND':
      var nextState = toggle(state, action);
      return nextState

    case 'GMAIL_LOGOUT':
      return {
        friends: [],
        follows: [],
        next: null,
        user: null,
        view: 'login',
      }

    case 'GMAIL_WAITING':
      return {
        ...state,
        view: 'empty',
      }

    default:
      return state;
  }
}

export const settings = (state = {}, action) => {
  switch(action.type) {
    case 'www':
      return state
    default:
      return state
  }
}

export const network = (state = false, action) => {
  switch(action.type) {
    case 'NETWORK':
      return action.data
    default:
      return state
  }
}

// expect(
//   facebook({}, {type: 'INIT_FACEBOOK', list: [42]})
// ).toEqual({follows: [42]})

// expect(
//   facebook({}, {type: 'INIT_INSTAGRAM', list: [42]})
// ).toEqual({follows: [42]})



// import expect from 'expect'


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
  console.log('toggle');
  console.log(index);
  if (index === -1) {
    return {
      ...state,
      friends: toggle_friends(state.friends, action),
      follows: [...state.follows, action.id.toString()],
    }
  } else {
    return {
      ...state,
      friends: toggle_friends(state.friends, action),
      follows: state.follows.slice(0, index).concat(state.follows.slice(index+1)),
    }
  }
}

export const facebook = (state = {}, action) => {
  switch(action.type) {
    case 'INIT_FACEBOOK':
      console.log('INIT_FACEBOOK');
      console.log(state);
      return {
        ...state,
        follows: action.list
      }

    case 'FB_NEXT':
      var nextState = {
        ...state,
        next: action.next,
      }
      console.log('FB_NEXT');
      console.log(nextState);
      return nextState;

    case 'FB_FETCH':
      var nextState = {
        friends: state.friends.concat(action.list),
        follows: state.follows,
        next: action.next,
      }
      console.log('FB_FETCH');
      console.log(nextState);
      return nextState

    case 'FB_TOGGLE':
      var nextState = toggle(state, action);
      console.log('FB_TOGGLE');
      console.log(nextState);
      return nextState;
    default:
      return state;
  }
}

export const instagram = (state = {}, action) => {
  switch(action.type) {
    case 'INIT_INSTAGRAM':
      return {
        ...state,
        follows: action.list
      }
    case 'IN_ADD':
      return state.concat(action.list);
    case 'IN_TOGGLE':
      return toggle(state, action);
    default:
      return state;
  }
}

// expect(
//   facebook({}, {type: 'INIT_FACEBOOK', list: [42]})
// ).toEqual({follows: [42]})

// expect(
//   facebook({}, {type: 'INIT_INSTAGRAM', list: [42]})
// ).toEqual({follows: [42]})



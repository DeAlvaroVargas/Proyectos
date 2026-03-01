import { Activity } from "../types"

//Las diferenres acciones del useReducer
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } | 
    { type: 'set-activeId', payload: { id : Activity['id'] } } |
    { type: 'delete-activity', payload: { id : Activity['id'] } } |
    { type: 'restart-app' } 

export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities') 
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}


//Un reducer es una función que siempre tiene que devolver algo
//ese algo debe ser del mismo tipo que state pasado por parámetro
//La idea es: en función de state pasado por parámetro, se devuelve
//un nuevo state:ActivityState  
export const activityReducer = (
        state : ActivityState = initialState,
        action: ActivityActions
    ) => {

    if(action.type === 'save-activity') {
        let updatedActivities : Activity[] = []
        if(state.activeId) {
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId') {
         return {
            ...state,
            activeId: action.payload.id
         }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}
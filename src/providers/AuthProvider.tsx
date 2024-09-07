import React, { useState,createContext, PropsWithChildren, useEffect, useContext, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";
import { Tables } from "../supabase-types";

type AuthData  = {
    session: Session | null,
    loading: boolean,
    profile: Tables<'profiles'> | null, 
    isAdmin: boolean,
    expo_push_token: string ,
    updateIsItAdmin: (role : boolean) => void
    updateToken: (token:string) => void
} 
//initialize the data here 
const initialState = {
    session: null, 
    loading: true,
    profile: null ,
    isAdmin: false, 
    expo_push_token: '',
    updateIsItAdmin: () => {},
    updateToken: () => {}
}
//Create context 


const reducer = (state : AuthData, action : any) => {
      switch (action.type) {
        case 'UPDATE_TOKEN':
          
        return {
          ...state,
          expo_push_token: action.payload, // Conditionally toggle property1
        };

      default:
        return state;
    }
}; 

// Create context
export const AuthContext = createContext<AuthData>(initialState)


export default function AuthProvider({children } : PropsWithChildren){
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<Tables<'profiles'> | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
  
      // UseReducer for handling more complex state updates like isAdmin
    const [state, dispatch] = useReducer(reducer, initialState);
    
  useEffect(() => {
    
      const fetchSession = async () => {
      try {
        const { data : { session }, error } = await supabase.auth.getSession();

        if (error) {
          // Handle error case
          Alert.alert('Error fetching session');
        } else if (session) {
          // Check if data is available and update session state
          setSession(session);
          //fetch the user profile 
          
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
          
          setProfile(data || null)
          setIsAdmin(data?.group === 'ADMIN')
          
            
        }
      } catch (error) {
        // Handle other errors (e.g., network issues)
        Alert.alert('Error fetching session');
        
      }
      setLoading(false)
    };

    fetchSession(); // Call fetchSession inside useEffect
        //this will keep record of the session when ever there is a change in session automatically
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Use an empty dependency array to run this effect only once on mount
    }, []); 
  
    

  // Dispatch function to conditionally toggle a property
    const updateIsItAdmin = async (role: boolean) => {
     setIsAdmin(role)
    };
    
  const updateToken = (token:string) => {
      dispatch({type:'UPDATE_TOKEN', payload: token})
    }


    return (
      <AuthContext.Provider value={{expo_push_token: state.expo_push_token, updateToken, updateIsItAdmin, session, loading,  isAdmin  ,profile }}>
            {children}
      </AuthContext.Provider>)

}

//custom hook to provide the data to the app using the react useContext 
export const useAuth = () =>  useContext(AuthContext)
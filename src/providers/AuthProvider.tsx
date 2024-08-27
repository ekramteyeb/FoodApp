import React, { useState,createContext, PropsWithChildren, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";
import { Tables } from "../supabase-types";

type AuthData = {
    session: Session | null,
    loading: boolean,
    profile: Tables<'profiles'> | null, 
    isAdmin: boolean
}
//initialize the data here 
const AuthContext = createContext<AuthData>({
    session: null, 
    loading: true,
    profile: null ,
    isAdmin: false
})

export default function AuthProvider({children } : PropsWithChildren){
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<any | null>(null)

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


    return (
      <AuthContext.Provider value={{session, loading,  isAdmin : profile?.group === 'ADMIN' ,profile }}>
            {children}
      </AuthContext.Provider>)

}

//custom hook to provide the data to the app using the react useContext 
export const useAuth = () =>  useContext(AuthContext)
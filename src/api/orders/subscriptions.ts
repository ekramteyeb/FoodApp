import { supabase } from "@/src/lib/supabase"
import { useEffect } from "react"
import { useQueryClient } from "react-query"

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient()
  
    useEffect(() => {

        const ordersSubscription = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    queryClient.invalidateQueries(['orders'])
                }
            )
        .subscribe()
        
        return () => {
        //to prevent from any leak memory
            ordersSubscription.unsubscribe()
        }

    }, [])

  
}

export const useUpdateOrderSubscription = (id: number) => { 
    const queryClient = useQueryClient()
  
    useEffect(() => {

        const ordersSubscription = supabase
            .channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${id}`,
                },
                (payload) => {
                    queryClient.invalidateQueries(['orders', id])
                }
            )
        .subscribe()
        
        return () => {
        //to prevent from any leak memory
            ordersSubscription.unsubscribe()
        }

    }, [])

}
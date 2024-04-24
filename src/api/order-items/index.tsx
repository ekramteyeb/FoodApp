import { useMutation, useQuery, useQueryClient } from "react-query"
import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider"
import { InsertTables } from "@/assets/types"


export const useInsertOrderItems = () => {
  const { session } = useAuth()
  

  return useMutation({
    async mutationFn (items: InsertTables<'order_items'>[]) {
      const { error, data: newOrder } = await supabase
        .from('order_items')
        .insert(items)
        .select()

      if(error) {
        throw new Error(error.message)
      }
      return newOrder
    }
    
  })
}
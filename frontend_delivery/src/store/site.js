import { defineStore } from "pinia";
import { URI } from "../service/conection";


export const useSitesStore = defineStore('site', {
   
    persist: {
       
                key: 'site', 
                storage: localStorage,
                paths:[
                    'site','currentCategory'

                    ]
    },
    state: () => {

        return {

            site:{

            },
            restaurant_id:1,
            update:0,
            categories:[],
            currentProducts:[],
            currentCategory:{}



        }
    },

    getters: {
    
        
    },

   

    actions: {

       
     setSite(site_info){
        this.site= site_info
     }
    },


})



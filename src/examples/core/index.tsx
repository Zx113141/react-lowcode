/***
 * inject canvas, components-map,  events, customs, animations, apis
 * 
 * is there somethtings i can re-use?
 * 
 * 
 * 
 * **/


// import somethings
import { mixins } from "../utils/mixin"
export const injectComponentsMap = (origin:any, newVaue:any) => {

    const components = mixins(origin, newVaue)

    return components

}

export const injectCanvas =() => {

    
}

export const injectSchema = () => {


}


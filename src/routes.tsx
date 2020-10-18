import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const { Navigator, Screen} = createStackNavigator();

import Orphanagesmap from './pages/OrphanagesMap'
import OrphanageDetails from "./pages/OrphanageDetails";
export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false,}}>
                {/* Para cada screen: options={{ OPCAO: VALOR }} */}
                <Screen name="OrphanagesMap" component={Orphanagesmap} /> 
                <Screen name="OrphanageDetails" component={OrphanageDetails} /> 
            </Navigator>
        </NavigationContainer>
    )
}
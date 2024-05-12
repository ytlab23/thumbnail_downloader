import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PublicRoutes from './router';

const DashApp = () => (
   
            <Provider store={store}>
              <PublicRoutes />
            </Provider>
          
  );
  export default DashApp;
import logo from './logo.svg';
import './App.css';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import SPECS from './specs/vnflcm_openapi_331'
function App() {
  return (
    <div className="App">
          <SwaggerUI spec={SPECS} requestInterceptor={(req)=>{

                console.log('called', req)
                return req;
          }}/>
    </div>
  );
}

export default App;

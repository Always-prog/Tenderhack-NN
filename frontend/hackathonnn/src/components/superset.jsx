import * as React from 'react';
import {embedDashboard} from '@superset-ui/embedded-sdk';


// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
function fetchGuestToken(supersetHost, provider, username, password, firstName, lastName, resources, rls) {
    const loginUrl = `${supersetHost}/api/v1/security/login`;
    const guestTokenUrl = `${supersetHost}/api/v1/security/guest_token/`;

    return fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider: provider,
        username: username,
        password: password,
        refresh: true
      }),
    })
    .then(response => response.json())
    .then(authTokens => {
      return fetch(guestTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access_token}`
        },
        body: JSON.stringify({
          user: {
            username: username,
            first_name: firstName,
            last_name: lastName
          },
          resources: resources,
          rls: rls
        }),
      });
    })
    .then(response => response.json())
    .then(auth => auth.token);
}


export default function SupersetEmbedded({supplier_inn}) {
    /* Define variables */
    const supersetDomain = "http://192.168.0.104:8088"; // Domain or IP address where Superset is located
    const embeddedId = "39c4ab45-3bf5-4a66-868e-3cb896253645"; // Embedding ID obtained from Superset
    const provider = 'db'; // db or ldap 
    const username = 'admin';
    const password = 'admin';
    const firstName = 'Superset';
    const lastName = 'Admin';
    const resources = [{'type': 'dashboard', 'id': '1'}]; // Dashboards that we should see 
    const rls = [
        {'clause': `supplier_inn = '${supplier_inn}'`}
    ]; // Row-level security filters. 
    /* 
    name_tt - column in the dataset 2492 with the name of the TT.
    */

    /* Fetch guest token and embed the dashboard */
    fetchGuestToken(supersetDomain, provider, username, password, firstName, lastName, resources, rls)
    .then(token => {
        embedDashboard({
        id: embeddedId, 
        supersetDomain: supersetDomain,
        mountPoint: document.getElementById("my-dashboard-container"), // HTML container into which the dashboard will be rendered
        fetchGuestToken: () => token, // Function to get guest token
        dashboardUiConfig: { hideTitle: true, hideChartControls: true, hideTab: true}, // Additional parameters for displaying the dashboard. 
        });
  });
  return <div id="my-dashboard-container" style={{width: '100%', height: '100%'}}>

  </div>
}
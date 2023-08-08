import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const domain = "dev-2wqnljb42wm16l1q.us.auth0.com";
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user	",
          });
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${encodeURIComponent(
            user.sub
          )}`;

          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!metadataResponse.ok) {
            throw new Error(
              `Request failed with status ${metadataResponse.status}`
            );
          }

          const userData = await metadataResponse.json();
          setApiData(userData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [getAccessTokenSilently, isAuthenticated, user?.sub]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  const tokenId = getAccessTokenSilently;
  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{" "}
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log out
        </button>
        <h3>User Metadata</h3>
        {apiData && (
          <div>
            <div>
              <p className="p-0">
                <strong>Name:</strong> {apiData.nickname}
              </p>
              <p className="p-0">
                <strong>Email:</strong> {apiData.email}
              </p>
              <p className="p-0">
                <strong>User Name:</strong> {apiData.username}
              </p>
              <p className="p-0">
                <strong>Last login:</strong> {apiData.last_login}
              </p>
              <p className="p-0">
                <strong>Login Counts:</strong> {apiData.logins_count}
              </p>
            </div>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  } else {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }
}

export default App;

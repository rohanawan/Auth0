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
          // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkV4WThlblhIaVFjT0poX0Z3eGFEOSJ9.eyJpc3MiOiJodHRwczovL2Rldi0yd3FubGpiNDJ3bTE2bDFxLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGQxYzgwODdmMTg0NTBkYzI0ZTYxZjUiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtMndxbmxqYjQyd20xNmwxcS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZGV2LTJ3cW5samI0MndtMTZsMXEudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MTQ5MjE2NSwiZXhwIjoxNjkxNTc4NTY1LCJhenAiOiI4a1FkdmRySHVxMUp3OXNFZWxySWxvQVJ3aEZHb3ZhVSIsInNjb3BlIjoib3BlbmlkIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEifQ.KYKWDRpXlPU3-hOWxUWoNSqziBBJE8IZFqfgkzo4KBdoR-bzahoK69uXeV6Ok94ZMVyHb1XRK1RhOipsNdrFTOqbGHUlXZv7RkT4gWlv-4bh_4OV5naFgARLTMRrSZqowfLzl7PUcTgUeGqatLa-TzgrxC3rKcEUTQNIyoVe_FvO9y7tZClpkkmZ6gZ9snOFYoUJiP-n0585sJkTAI7auNMK8IaBA9ThVOt0xRSRoAY6Ul0QZYGy1NZORd3P8Rju2RBkuhUumfEyKJCDr7xU5iyZwZuLu7RGJcp256UF-Wi2tvAXlyRpo4LVUQ10o4k53uTOi1dfe7M-AVsBr_OCrg

          // const accessToken =
          //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkV4WThlblhIaVFjT0poX0Z3eGFEOSJ9.eyJpc3MiOiJodHRwczovL2Rldi0yd3FubGpiNDJ3bTE2bDFxLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJPVzBkU2k0bjB0NzV4TmpUQndyMnRFRFBEQXpNWThXa0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtMndxbmxqYjQyd20xNmwxcS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5MTQ4NTMzNCwiZXhwIjoxNjkxNTcxNzM0LCJhenAiOiJPVzBkU2k0bjB0NzV4TmpUQndyMnRFRFBEQXpNWThXayIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.PA9oQq8SA03xWQBvMUwr5LaFM82x6fDTReHdwK1TupdVTwDNQUrswIXnFuOadwJwQyK_5pLWQw2AY-LJEWUraVoErg3r0BKddek13qUEHVBJwP1riA1XDqBx1gmjof3NJeIiNfAB7zGB0_q5H37JOZKeKabXaZcO9dXWjWIAGINvMqEZupTOG--uEtFpxfbFP8ErCVXI1GSwHWRwBakyn79aN3LE2j6nhNsO76V33Uwkwb8mdISUFnGWKNf-Nv73qzuR8lcPzIRiOdfeRNQBOI95QcksjgvBmuJLcBRsFAFosOOEDK7sXhVebQmnsUufu8tOC6bbt4XVTRNS57vvmw";
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${encodeURIComponent(
            user.sub
          )}`;

          console.log("access", accessToken);
          console.log("user.sub", user.sub);
          console.log("userDetailsByIdUrl", userDetailsByIdUrl);

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
          console.log("metadataResponse", userData);
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
  console.log(tokenId);
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

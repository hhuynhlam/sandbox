import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import sdk from "@zapehr/sdk";

function Page() {
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const zapClient = useMemo(() => {
    if (accessToken) {
      sdk.init({
        ZAPEHR_ACCESS_TOKEN: accessToken,
        ZAPEHR_PROJECT_ID: "e650038e-f4d7-4ec3-b65e-daff0085759f",
      });

      return sdk;
    }

    return null;
  }, [accessToken]);

  // This effect is responsible for fetching the access token.
  useEffect(() => {
    async function fetchAccessToken() {
      const token = await getAccessTokenSilently();

      setAccessToken(token);
    }

    fetchAccessToken();
  }, [getAccessTokenSilently]);

  // This effect is responsible for fetching appointments.
  useEffect(() => {
    async function fetchAppointments() {
      if (!zapClient) {
        console.log("Zap client initializing...");

        return;
      }

      // Fetch appointments from the FHIR server.
      const response = await zapClient.fhir.list({
        resourceType: "Appointment",
      });

      console.log({ response });
    }

    fetchAppointments();
  }, [zapClient]);

  return (
    <>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </>
  );
}

export default Page;

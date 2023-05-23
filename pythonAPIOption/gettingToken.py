import requests 

def main():
    # Define the endpoint URL
    url = "https://test.api.amadeus.com/v1/security/oauth2/token"

    # Set the request headers
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    key = "OA1kI1wAG1U87REBGsmgGK3mF8isPd7a"
    secret = "KaQ1vwdHt1qoo1Xg"

    # Set the request body parameters
    data = {
        "grant_type": "client_credentials",
        "client_id": key,
        "client_secret": secret,
    }

    # Send the POST request
    response = requests.post(url, headers=headers, data=data)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Extract the access token from the response
        access_token = response.json()["access_token"]

        print(access_token)

if __name__ == "__main__":
    main()

# token: "B42XcRy3k7aaTajVREth81BC93K6"
